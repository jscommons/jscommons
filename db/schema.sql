--
-- PostgreSQL database dump
--

-- Dumped from database version 12.6 (Ubuntu 12.6-1.pgdg18.04+1)
-- Dumped by pg_dump version 13.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = on;

ALTER TABLE ONLY public.votes DROP CONSTRAINT votes_profile_id_fkey;
ALTER TABLE ONLY public.votes DROP CONSTRAINT votes_post_id_fkey;
ALTER TABLE ONLY public.profiles DROP CONSTRAINT user_id_fk;
ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_parent_fkey;
ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_author_fkey;
ALTER TABLE ONLY public.votes DROP CONSTRAINT votes_pkey;
ALTER TABLE ONLY public.profiles DROP CONSTRAINT unique_username;
ALTER TABLE ONLY public.profiles DROP CONSTRAINT profiles_pkey;
ALTER TABLE ONLY public.posts DROP CONSTRAINT posts_pkey;
DROP VIEW public.threaded_posts;
DROP VIEW public.scored_posts;
DROP TABLE public.votes;
DROP TABLE public.profiles;
DROP TABLE public.posts;
DROP FUNCTION public.get_top_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb);
DROP FUNCTION public.get_latest_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb);
DROP SCHEMA public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: get_latest_posts(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_latest_posts(
    profile_id uuid,
    OUT id uuid,
    OUT title character varying,
    OUT link character varying,
    OUT body text,
    OUT profile_id uuid,
    OUT created_at timestamp with time zone,
    OUT updated_at timestamp with time zone,
    OUT parent_id uuid,
    OUT depth integer,
    OUT score double precision,
    OUT reply_count numeric,
    OUT total_score double precision,
    OUT author jsonb,
    OUT vote jsonb
) RETURNS SETOF record
LANGUAGE sql
AS $$
	select scored_posts.*, to_jsonb(votes.*) as vote
	from scored_posts
	left join votes
        on votes.post_id = scored_posts.id
        and votes.profile_id = get_latest_posts.profile_id
	where parent_id is null
	order by created_at desc
	limit 30;
$$;


ALTER FUNCTION public.get_latest_posts(
    profile_id uuid,
    OUT id uuid,
    OUT title character varying,
    OUT link character varying,
    OUT body text,
    OUT profile_id uuid,
    OUT created_at timestamp with time zone,
    OUT updated_at timestamp with time zone,
    OUT parent_id uuid,
    OUT depth integer,
    OUT score double precision,
    OUT reply_count numeric,
    OUT total_score double precision,
    OUT author jsonb,
    OUT vote jsonb
) OWNER TO postgres;

--
-- Name: get_top_posts(uuid); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.get_top_posts(
    profile_id uuid,
    OUT id uuid,
    OUT title character varying,
    OUT link character varying,
    OUT body text,
    OUT profile_id uuid,
    OUT created_at timestamp with time zone,
    OUT updated_at timestamp with time zone,
    OUT parent_id uuid,
    OUT depth integer,
    OUT score double precision,
    OUT reply_count numeric,
    OUT total_score double precision,
    OUT author jsonb,
    OUT vote jsonb
) RETURNS SETOF record
LANGUAGE sql
AS $$
	select scored_posts.*, to_jsonb(votes.*) as vote
	from scored_posts
	left join votes
        on votes.post_id = scored_posts.id
        and votes.profile_id = get_top_posts.profile_id
	where parent_id is null
	order by total_score desc
	limit 30;
$$;


ALTER FUNCTION public.get_top_posts(
    profile_id uuid,
    OUT id uuid,
    OUT title character varying,
    OUT link character varying,
    OUT body text, OUT profile_id uuid,
    OUT created_at timestamp with time zone,
    OUT updated_at timestamp with time zone,
    OUT parent_id uuid,
    OUT depth integer,
    OUT score double precision,
    OUT reply_count numeric,
    OUT total_score double precision,
    OUT author jsonb,
    OUT vote jsonb
) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    title character varying,
    link character varying,
    body text,
    profile_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    parent_id uuid
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: votes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.votes (
    id uuid DEFAULT extensions.uuid_generate_v4() NOT NULL,
    value smallint DEFAULT '1'::smallint NOT NULL,
    post_id uuid NOT NULL,
    profile_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.votes OWNER TO postgres;

--
-- Name: scored_posts; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.scored_posts AS
 WITH RECURSIVE posts_with_depth AS (
         SELECT posts.id,
            posts.title,
            posts.link,
            posts.body,
            posts.profile_id,
            posts.created_at,
            posts.updated_at,
            posts.parent_id,
            0 AS depth,
            ( SELECT ((COALESCE(sum(votes.value), (0)::bigint))::double precision + ((date_part('epoch'::text, posts.created_at) - date_part('epoch'::text, now())) / (((60 * 60) * 24))::double precision))
                   FROM public.votes
                  WHERE (votes.post_id = posts.id)) AS score
           FROM public.posts
          WHERE (posts.parent_id IS NULL)
        UNION ALL
         SELECT reply.id,
            reply.title,
            reply.link,
            reply.body,
            reply.profile_id,
            reply.created_at,
            reply.updated_at,
            reply.parent_id,
            (parent.depth + 1),
            ( SELECT ((COALESCE(sum(votes.value), (0)::bigint))::double precision + ((date_part('epoch'::text, reply.created_at) - date_part('epoch'::text, now())) / (((60 * 60) * 24))::double precision))
                   FROM public.votes
                  WHERE (votes.post_id = reply.id)) AS score
           FROM (public.posts reply
             JOIN posts_with_depth parent ON ((parent.id = reply.parent_id)))
        ), max_depth AS (
         SELECT max(posts_with_depth.depth) AS max_depth
           FROM posts_with_depth
        ), scored_posts AS (
         SELECT posts_with_depth.id,
            posts_with_depth.title,
            posts_with_depth.link,
            posts_with_depth.body,
            posts_with_depth.profile_id,
            posts_with_depth.created_at,
            posts_with_depth.updated_at,
            posts_with_depth.parent_id,
            posts_with_depth.depth,
            posts_with_depth.score,
            (0)::numeric AS reply_count
           FROM posts_with_depth,
            max_depth
          WHERE (posts_with_depth.depth = max_depth.max_depth)
        UNION (
                 SELECT (branch.branch_parent).id AS id,
                    (branch.branch_parent).title AS title,
                    (branch.branch_parent).link AS link,
                    (branch.branch_parent).body AS body,
                    (branch.branch_parent).profile_id AS profile_id,
                    (branch.branch_parent).created_at AS created_at,
                    (branch.branch_parent).updated_at AS updated_at,
                    (branch.branch_parent).parent_id AS parent_id,
                    (branch.branch_parent).depth AS depth,
                    (branch.branch_parent).score AS score,
                    (sum(branch.reply_count) + (count(*))::numeric)
                   FROM ( SELECT branch_parent.*::record AS branch_parent,
                            branch_child.reply_count
                           FROM (posts_with_depth branch_parent
                             JOIN scored_posts branch_child ON ((branch_child.parent_id = branch_parent.id)))) branch
                  GROUP BY branch.branch_parent
                UNION
                 SELECT c.id,
                    c.title,
                    c.link,
                    c.body,
                    c.profile_id,
                    c.created_at,
                    c.updated_at,
                    c.parent_id,
                    c.depth,
                    c.score,
                    (0)::numeric AS "numeric"
                   FROM posts_with_depth c
                  WHERE (NOT (EXISTS ( SELECT 1
                           FROM posts_with_depth hypothetical_child
                          WHERE (hypothetical_child.parent_id = c.id))))
        )
        )
 SELECT s.id,
    s.title,
    s.link,
    s.body,
    s.profile_id,
    s.created_at,
    s.updated_at,
    s.parent_id,
    s.depth,
    s.score,
    s.reply_count,
    (s.score + (s.reply_count)::double precision) AS total_score,
    to_jsonb(p.*) AS author
   FROM (scored_posts s
     JOIN public.profiles p ON ((p.id = s.profile_id)));


ALTER TABLE public.scored_posts OWNER TO postgres;

--
-- Name: threaded_posts; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW public.threaded_posts AS
 WITH RECURSIVE max_depth AS (
         SELECT max(scored_posts.depth) AS max_depth
           FROM public.scored_posts
        ), threaded_posts AS (
         SELECT scored_posts.id,
            scored_posts.title,
            scored_posts.link,
            scored_posts.body,
            scored_posts.profile_id,
            scored_posts.created_at,
            scored_posts.updated_at,
            scored_posts.parent_id,
            scored_posts.depth,
            scored_posts.score,
            scored_posts.reply_count,
            scored_posts.total_score,
            scored_posts.author,
            jsonb_build_object('count', 0) AS replies
           FROM public.scored_posts,
            max_depth
          WHERE (scored_posts.depth = max_depth.max_depth)
        UNION (
                 SELECT (branch.branch_parent).id AS id,
                    (branch.branch_parent).title AS title,
                    (branch.branch_parent).link AS link,
                    (branch.branch_parent).body AS body,
                    (branch.branch_parent).profile_id AS profile_id,
                    (branch.branch_parent).created_at AS created_at,
                    (branch.branch_parent).updated_at AS updated_at,
                    (branch.branch_parent).parent_id AS parent_id,
                    (branch.branch_parent).depth AS depth,
                    (branch.branch_parent).score AS score,
                    (branch.branch_parent).reply_count AS reply_count,
                    (branch.branch_parent).total_score AS total_score,
                    (branch.branch_parent).author AS author,
                    jsonb_build_object('list', jsonb_agg(branch.branch_child), 'count', count(*)) AS jsonb_build_object
                   FROM ( SELECT branch_parent.*::public.scored_posts AS branch_parent,
                            to_jsonb(branch_child.*) AS branch_child
                           FROM (public.scored_posts branch_parent
                             JOIN threaded_posts branch_child ON ((branch_child.parent_id = branch_parent.id)))) branch
                  GROUP BY branch.branch_parent
                UNION
                 SELECT c.id,
                    c.title,
                    c.link,
                    c.body,
                    c.profile_id,
                    c.created_at,
                    c.updated_at,
                    c.parent_id,
                    c.depth,
                    c.score,
                    c.reply_count,
                    c.total_score,
                    c.author,
                    jsonb_build_object('count', 0) AS jsonb_build_object
                   FROM public.scored_posts c
                  WHERE (NOT (EXISTS ( SELECT 1
                           FROM public.scored_posts hypothetical_child
                          WHERE (hypothetical_child.parent_id = c.id))))
        )
        )
 SELECT threaded_posts.id,
    threaded_posts.title,
    threaded_posts.link,
    threaded_posts.body,
    threaded_posts.profile_id,
    threaded_posts.created_at,
    threaded_posts.updated_at,
    threaded_posts.parent_id,
    threaded_posts.depth,
    threaded_posts.score,
    threaded_posts.reply_count,
    threaded_posts.total_score,
    threaded_posts.author,
    threaded_posts.replies
   FROM threaded_posts;


ALTER TABLE public.threaded_posts OWNER TO postgres;

--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles unique_username; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT unique_username UNIQUE (username);


--
-- Name: votes votes_pkey; Type: CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_profile_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_profile_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: posts posts_parent_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_parent_fkey FOREIGN KEY (parent_id) REFERENCES public.posts(id);


--
-- Name: profiles user_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users(id);


--
-- Name: votes votes_post_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_post_id_fkey FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: votes votes_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: supabase_admin
--

ALTER TABLE ONLY public.votes
    ADD CONSTRAINT votes_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION get_latest_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_latest_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb) TO anon;
GRANT ALL ON FUNCTION public.get_latest_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.get_latest_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb) TO service_role;


--
-- Name: FUNCTION get_top_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.get_top_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb) TO anon;
GRANT ALL ON FUNCTION public.get_top_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb) TO authenticated;
GRANT ALL ON FUNCTION public.get_top_posts(profile_id uuid, OUT id uuid, OUT title character varying, OUT link character varying, OUT body text, OUT profile_id uuid, OUT created_at timestamp with time zone, OUT updated_at timestamp with time zone, OUT parent_id uuid, OUT depth integer, OUT score double precision, OUT reply_count numeric, OUT total_score double precision, OUT author jsonb, OUT vote jsonb) TO service_role;


--
-- Name: TABLE posts; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.posts TO postgres;
GRANT ALL ON TABLE public.posts TO anon;
GRANT ALL ON TABLE public.posts TO authenticated;
GRANT ALL ON TABLE public.posts TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.profiles TO postgres;
GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE votes; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.votes TO postgres;
GRANT ALL ON TABLE public.votes TO anon;
GRANT ALL ON TABLE public.votes TO authenticated;
GRANT ALL ON TABLE public.votes TO service_role;


--
-- Name: TABLE scored_posts; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.scored_posts TO postgres;
GRANT ALL ON TABLE public.scored_posts TO anon;
GRANT ALL ON TABLE public.scored_posts TO authenticated;
GRANT ALL ON TABLE public.scored_posts TO service_role;


--
-- Name: TABLE threaded_posts; Type: ACL; Schema: public; Owner: supabase_admin
--

GRANT ALL ON TABLE public.threaded_posts TO postgres;
GRANT ALL ON TABLE public.threaded_posts TO anon;
GRANT ALL ON TABLE public.threaded_posts TO authenticated;
GRANT ALL ON TABLE public.threaded_posts TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON SEQUENCES  FROM supabase_admin;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM PUBLIC;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON FUNCTIONS  FROM supabase_admin;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public REVOKE ALL ON TABLES  FROM supabase_admin;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES  TO service_role;


--
-- PostgreSQL database dump complete
--

