var express = require("express");
var router = express.Router();
var db = require('../db');

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  db.any(`
--
-- PostgreSQL database dump
--

-- Dumped from database version 10.5
-- Dumped by pg_dump version 10.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: Categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Categories" (
    "CategoryName" text NOT NULL,
    "CategoryID" integer NOT NULL
);


ALTER TABLE public."Categories" OWNER TO postgres;

--
-- Name: Categories_CategoryID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Categories_CategoryID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Categories_CategoryID_seq" OWNER TO postgres;

--
-- Name: Categories_CategoryID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Categories_CategoryID_seq" OWNED BY public."Categories"."CategoryID";


--
-- Name: Dashboard; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Dashboard" (
    "UserID" integer NOT NULL,
    "ItemID" integer NOT NULL,
    "MessageID" integer NOT NULL,
    "DashboardID" integer NOT NULL
);


ALTER TABLE public."Dashboard" OWNER TO postgres;

--
-- Name: Dashboard_DashboardID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Dashboard_DashboardID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Dashboard_DashboardID_seq" OWNER TO postgres;

--
-- Name: Dashboard_DashboardID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Dashboard_DashboardID_seq" OWNED BY public."Dashboard"."DashboardID";


--
-- Name: GatorMessages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."GatorMessages" (
    "MessageDescription" text NOT NULL,
    "ItemID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "MessageID" integer NOT NULL
);


ALTER TABLE public."GatorMessages" OWNER TO postgres;

--
-- Name: GatorMessages_MessageID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."GatorMessages_MessageID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."GatorMessages_MessageID_seq" OWNER TO postgres;

--
-- Name: GatorMessages_MessageID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."GatorMessages_MessageID_seq" OWNED BY public."GatorMessages"."MessageID";


--
-- Name: Items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Items" (
    "ItemTitle" text NOT NULL,
    "DatePosted" timestamp(6) with time zone NOT NULL,
    "ItemImage" text NOT NULL,
    "ItemDescription" text NOT NULL,
    "ItemPrice" money NOT NULL,
    "Availability" boolean NOT NULL,
    "StatusApproved" boolean NOT NULL,
    "CategoryID" integer NOT NULL,
    "UserID" integer NOT NULL,
    "ItemID" integer NOT NULL
);


ALTER TABLE public."Items" OWNER TO postgres;

--
-- Name: Items_ItemID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Items_ItemID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Items_ItemID_seq" OWNER TO postgres;

--
-- Name: Items_ItemID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Items_ItemID_seq" OWNED BY public."Items"."ItemID";


--
-- Name: UserRecord; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."UserRecord" (
    "FirstName" text NOT NULL,
    "LastName" text NOT NULL,
    "UserEmail" text NOT NULL,
    "UserPW" text NOT NULL,
    "Username" text NOT NULL,
    "AdminPrivilege" boolean NOT NULL,
    "UserID" integer NOT NULL
);


ALTER TABLE public."UserRecord" OWNER TO postgres;

--
-- Name: RegistrationRec_UserID_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."RegistrationRec_UserID_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."RegistrationRec_UserID_seq" OWNER TO postgres;

--
-- Name: RegistrationRec_UserID_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."RegistrationRec_UserID_seq" OWNED BY public."UserRecord"."UserID";


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: test_table; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.test_table (
    id integer NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "testString" character varying(255) NOT NULL
);


ALTER TABLE public.test_table OWNER TO postgres;

--
-- Name: test_table_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.test_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.test_table_id_seq OWNER TO postgres;

--
-- Name: test_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.test_table_id_seq OWNED BY public.test_table.id;


--
-- Name: Categories CategoryID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories" ALTER COLUMN "CategoryID" SET DEFAULT nextval('public."Categories_CategoryID_seq"'::regclass);


--
-- Name: Dashboard DashboardID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dashboard" ALTER COLUMN "DashboardID" SET DEFAULT nextval('public."Dashboard_DashboardID_seq"'::regclass);


--
-- Name: GatorMessages MessageID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GatorMessages" ALTER COLUMN "MessageID" SET DEFAULT nextval('public."GatorMessages_MessageID_seq"'::regclass);


--
-- Name: Items ItemID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items" ALTER COLUMN "ItemID" SET DEFAULT nextval('public."Items_ItemID_seq"'::regclass);


--
-- Name: UserRecord UserID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRecord" ALTER COLUMN "UserID" SET DEFAULT nextval('public."RegistrationRec_UserID_seq"'::regclass);


--
-- Name: test_table id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_table ALTER COLUMN id SET DEFAULT nextval('public.test_table_id_seq'::regclass);


--
-- Name: Categories Categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Categories"
    ADD CONSTRAINT "Categories_pkey" PRIMARY KEY ("CategoryID");


--
-- Name: Dashboard Dashboard_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dashboard"
    ADD CONSTRAINT "Dashboard_pkey" PRIMARY KEY ("DashboardID");


--
-- Name: GatorMessages GatorMessages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GatorMessages"
    ADD CONSTRAINT "GatorMessages_pkey" PRIMARY KEY ("MessageID");


--
-- Name: Items Items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "Items_pkey" PRIMARY KEY ("ItemID");


--
-- Name: UserRecord RegistrationRec_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."UserRecord"
    ADD CONSTRAINT "RegistrationRec_pkey" PRIMARY KEY ("UserID");


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: test_table test_table_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.test_table
    ADD CONSTRAINT test_table_pkey PRIMARY KEY (id);


--
-- Name: Items CategoryID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "CategoryID_fk" FOREIGN KEY ("CategoryID") REFERENCES public."Categories"("CategoryID");


--
-- Name: Dashboard ItemID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dashboard"
    ADD CONSTRAINT "ItemID_fk" FOREIGN KEY ("ItemID") REFERENCES public."Items"("ItemID");


--
-- Name: GatorMessages ItemID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GatorMessages"
    ADD CONSTRAINT "ItemID_fk" FOREIGN KEY ("ItemID") REFERENCES public."Items"("ItemID");


--
-- Name: Dashboard MessageID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dashboard"
    ADD CONSTRAINT "MessageID_fk" FOREIGN KEY ("MessageID") REFERENCES public."GatorMessages"("MessageID");


--
-- Name: Dashboard UserID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Dashboard"
    ADD CONSTRAINT "UserID_fk" FOREIGN KEY ("UserID") REFERENCES public."UserRecord"("UserID");


--
-- Name: GatorMessages UserID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."GatorMessages"
    ADD CONSTRAINT "UserID_fk" FOREIGN KEY ("UserID") REFERENCES public."UserRecord"("UserID");


--
-- Name: Items UserID_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Items"
    ADD CONSTRAINT "UserID_fk" FOREIGN KEY ("UserID") REFERENCES public."UserRecord"("UserID");


--
-- PostgreSQL database dump complete
--
`)
.catch( error => {
console.log( error )
res.json({ error })
});
});
module.exports = router;
