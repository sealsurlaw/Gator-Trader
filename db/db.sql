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
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: category; Type: TABLE; Schema: public; Owner: -
--

DROP TABLE IF EXISTS public.user_record, public.item, public.dashboard, public.category, public.gator_message;


CREATE TABLE public.category (
    category_id integer NOT NULL,
    category_name text NOT NULL
);


--
-- Name: category_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.category_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: category_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.category_category_id_seq OWNED BY public.category.category_id;


--
-- Name: gator_message; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.gator_message (
    message_id integer NOT NULL,
    message_text text NOT NULL,
    message_date timestamp(6) with time zone DEFAULT now(),
    user_id integer NOT NULL,
    item_id integer NOT NULL
);


--
-- Name: gator_message_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gator_message_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gator_message_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gator_message_item_id_seq OWNED BY public.gator_message.item_id;


--
-- Name: gator_message_message_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gator_message_message_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gator_message_message_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gator_message_message_id_seq OWNED BY public.gator_message.message_id;


--
-- Name: gator_message_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.gator_message_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: gator_message_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.gator_message_user_id_seq OWNED BY public.gator_message.user_id;


--
-- Name: item; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.item (
    item_id integer NOT NULL,
    item_title text NOT NULL,
    item_description text NOT NULL,
    item_price money NOT NULL,
    item_status text NOT NULL,
    user_id integer NOT NULL,
    category_id integer NOT NULL,
    item_image text NOT NULL,
    item_availability boolean NOT NULL,
    item_image_thumbnail text NOT NULL,
    item_date timestamp(6) with time zone DEFAULT now()
);


--
-- Name: item_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.item_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: item_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.item_category_id_seq OWNED BY public.item.category_id;


--
-- Name: item_item_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.item_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: item_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.item_item_id_seq OWNED BY public.item.item_id;


--
-- Name: item_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.item_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: item_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.item_user_id_seq OWNED BY public.item.user_id;


--
-- Name: session; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


--
-- Name: user_record; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_record (
    user_id integer NOT NULL,
    user_name text NOT NULL,
    user_password text NOT NULL,
    user_email text NOT NULL,
    admin_right boolean NOT NULL,
    user_date timestamp(6) with time zone DEFAULT now()
);


--
-- Name: user_record_user_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_record_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_record_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_record_user_id_seq OWNED BY public.user_record.user_id;


--
-- Name: category category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category ALTER COLUMN category_id SET DEFAULT nextval('public.category_category_id_seq'::regclass);


--
-- Name: gator_message message_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gator_message ALTER COLUMN message_id SET DEFAULT nextval('public.gator_message_message_id_seq'::regclass);


--
-- Name: gator_message user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gator_message ALTER COLUMN user_id SET DEFAULT nextval('public.gator_message_user_id_seq'::regclass);


--
-- Name: gator_message item_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gator_message ALTER COLUMN item_id SET DEFAULT nextval('public.gator_message_item_id_seq'::regclass);


--
-- Name: item item_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item ALTER COLUMN item_id SET DEFAULT nextval('public.item_item_id_seq'::regclass);


--
-- Name: item user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item ALTER COLUMN user_id SET DEFAULT nextval('public.item_user_id_seq'::regclass);


--
-- Name: item category_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item ALTER COLUMN category_id SET DEFAULT nextval('public.item_category_id_seq'::regclass);


--
-- Name: user_record user_id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_record ALTER COLUMN user_id SET DEFAULT nextval('public.user_record_user_id_seq'::regclass);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.category (category_id, category_name) VALUES (1, 'Electronics');
INSERT INTO public.category (category_id, category_name) VALUES (2, 'Books');
INSERT INTO public.category (category_id, category_name) VALUES (3, 'Games');
INSERT INTO public.category (category_id, category_name) VALUES (4, 'Clothes');
INSERT INTO public.category (category_id, category_name) VALUES (5, 'Home Appliances');


--
-- Data for Name: gator_message; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.gator_message (message_id, message_text, message_date, user_id, item_id) VALUES (7, 'Hi I am interested in buying your item: GTA 5', '2018-12-04 17:41:21.844658-08', 41, 151);


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (101, 'Cat Sweater', 'sdgsgsdg', '$23.00', 'Pending', 39, 4, 'https://i.imgur.com/43SzPXh.jpg', true, 'https://i.imgur.com/E7f4XAn.jpg', '2018-11-16 10:09:12.938142-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (102, 'Cat Sweater', 'sdgsgsdg', '$23.00', 'Pending', 39, 4, 'https://i.imgur.com/oVDqSDO.jpg', true, 'https://i.imgur.com/G7Uvpvg.jpg', '2018-11-16 10:10:03.881636-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (103, 'Cat Sweater', 'sdgsgsdg', '$23.00', 'Pending', 39, 4, 'https://i.imgur.com/i6FICYv.jpg', true, 'https://i.imgur.com/ws3BWOr.jpg', '2018-11-16 10:14:11.755028-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (106, 'Cat Sweater', 'sdgsgsdg', '$23.00', 'Pending', 39, 4, 'https://i.imgur.com/cOFHlND.jpg', true, 'https://i.imgur.com/PGdivQf.jpg', '2018-11-16 10:18:52.668819-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (107, ',nknlknlknl', 'sdvxcvxcvc', '$22.00', 'Pending', 39, 3, 'https://i.imgur.com/0daiyb3.jpg', true, 'https://i.imgur.com/3klWjWK.jpg', '2018-11-16 10:19:02.938607-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (108, ',nknlknlknl', 'sdvxcvxcvc', '$22.00', 'Pending', 39, 3, 'https://i.imgur.com/sFByDVr.jpg', true, 'https://i.imgur.com/Z8RzWdd.jpg', '2018-11-16 10:20:39.187991-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (109, ',nknlknlknl', 'sdvxcvxcvc', '$22.00', 'Pending', 39, 3, 'https://i.imgur.com/sADrDAr.jpg', true, 'https://i.imgur.com/ke95P5n.jpg', '2018-11-16 10:22:00.567934-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (110, ',nknlknlknl', 'sdvxcvxcvc', '$22.00', 'Pending', 39, 3, 'https://i.imgur.com/gGGLK8h.jpg', true, 'https://i.imgur.com/VoC8Jwf.jpg', '2018-11-16 10:22:47.729523-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (111, 'jhlkhjljl', 'Dont use app', '$23.00', 'Pending', 39, 1, 'https://i.imgur.com/jfKy4a3.jpg', true, 'https://i.imgur.com/uY8vdjb.jpg', '2018-11-16 10:27:17.271482-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (150, 'GTA 5', 'Cool game', '$23.00', 'Pending', 41, 3, 'https://i.imgur.com/bv5pA2k.jpg', true, 'https://i.imgur.com/xWQ81er.jpg', '2018-12-04 17:27:20.38982-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (151, 'GTA 5', 'Cool game', '$23.00', 'Pending', 41, 3, 'https://i.imgur.com/xBDe68r.jpg', true, 'https://i.imgur.com/OnPd198.jpg', '2018-12-04 17:28:02.058896-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (105, 'Cat Sweater', 'sdgsgsdg', '$23.00', 'Approved', 39, 4, 'https://i.imgur.com/0XhIdw5.jpg', true, 'https://i.imgur.com/RhQ7boA.jpg', '2018-11-16 10:16:58.305528-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (104, 'Cat Sweater', 'sdgsgsdg', '$23.00', 'Approved', 39, 4, 'https://i.imgur.com/ublQwKf.jpg', true, 'https://i.imgur.com/sipMsiB.jpg', '2018-11-16 10:15:16.094651-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (152, 'GTA 5', 'Cool game', '$23.00', 'Approved', 41, 3, 'https://i.imgur.com/7t0wcbG.jpg', true, 'https://i.imgur.com/BQTLS8L.jpg', '2018-12-04 17:29:18.381359-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (154, 'Dog Hat', 'Cute knitted dog hat', '$150.00', 'Approved', 41, 4, 'https://i.imgur.com/oDPvOW6.jpg', true, 'https://i.imgur.com/xEKywYI.jpg', '2018-12-06 13:46:58.8748-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (112, 'iPhone X', 'Cool iphone', '$230.00', 'Pending', 39, 1, 'https://i.imgur.com/MdDnJXv.jpg', true, 'https://i.imgur.com/TZdaDa1.jpg', '2018-11-16 13:30:09.076228-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (113, 'Cat Sweater', 'ilj', '$99.00', 'Pending', 40, 4, 'https://i.imgur.com/ZTHch8w.jpg', true, 'https://i.imgur.com/64u0vug.jpg', '2018-11-20 20:20:12.347744-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (114, 'weewr', 'sdfsgd', '$33.00', 'Pending', 40, 3, 'https://i.imgur.com/hCl4PNi.jpg', true, 'https://i.imgur.com/V9ToIYW.jpg', '2018-11-20 20:23:21.924647-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (115, 'weewr', 'sdfsgd', '$33.00', 'Pending', 40, 3, 'https://i.imgur.com/Hpz7nze.jpg', true, 'https://i.imgur.com/b35Bgwd.jpg', '2018-11-20 20:24:17.136254-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (143, 'GTA 5', 'The most awesome great game in the world', '$23.00', 'Pending', 41, 3, 'https://i.imgur.com/6i24Hu5.jpg', true, 'https://i.imgur.com/1bxVGPz.jpg', '2018-12-04 16:58:02.899341-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (145, 'GTA 5', 'Cool game', '$23.00', 'Pending', 41, 3, 'https://i.imgur.com/hmyVOFF.jpg', true, 'https://i.imgur.com/6CIISnH.jpg', '2018-12-04 17:11:42.401372-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (146, 'GTA 5', 'Cool game', '$23.00', 'Approved', 41, 3, 'https://i.imgur.com/nrChvGS.jpg', true, 'https://i.imgur.com/JvmBmar.jpg', '2018-12-04 17:15:16.406761-08');
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_availability, item_image_thumbnail, item_date) VALUES (153, 'GTA 5', 'Cool game', '$50.00', 'Pending', 41, 3, 'https://i.imgur.com/49cUbel.jpg', true, 'https://i.imgur.com/PKxFk5v.jpg', '2018-12-06 00:53:55.373547-08');


--
-- Data for Name: session; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.session (sid, sess, expire) VALUES ('mPChcXaeyTuLdv3ylegW7RfQEmnmKSx1', '{"cookie":{"originalMaxAge":86399999,"expires":"2018-12-08T21:37:32.749Z","httpOnly":true,"path":"/"},"nextPage":"/dashboard","user_id":41}', '2018-12-08 13:44:35');
INSERT INTO public.session (sid, sess, expire) VALUES ('F2cOA1xLJ5TjBNSKZTRabRvqjiYgU26E', '{"cookie":{"originalMaxAge":86400000,"expires":"2018-12-07T08:53:22.703Z","httpOnly":true,"path":"/"},"user_id":41}', '2018-12-07 17:05:25');


--
-- Data for Name: user_record; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.user_record (user_id, user_name, user_password, user_email, admin_right, user_date) VALUES (39, 'moses', 'sha1$48a4f2b0$1$1b52d8d0d593891aead57f74991592a5b06b7031', 'moses@mail.sfsu.edu', false, '2018-11-15 18:08:38.834669-08');
INSERT INTO public.user_record (user_id, user_name, user_password, user_email, admin_right, user_date) VALUES (40, 'cat', 'sha1$9b76a596$1$6a3bb04dcd40343d189c3feb67189bcd08cecb21', 'cat@mail.sfsu.edu', false, '2018-11-20 12:43:30.117111-08');
INSERT INTO public.user_record (user_id, user_name, user_password, user_email, admin_right, user_date) VALUES (41, 'dylan', 'sha1$0d957e94$1$6b242d89308178c9e829dbc77419b5e46613b063', 'dylan@mail.sfsu.edu', true, '2018-11-27 16:57:59.224485-08');


--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.category_category_id_seq', 5, true);


--
-- Name: gator_message_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gator_message_item_id_seq', 1, false);


--
-- Name: gator_message_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gator_message_message_id_seq', 7, true);


--
-- Name: gator_message_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.gator_message_user_id_seq', 1, false);


--
-- Name: item_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.item_category_id_seq', 1, false);


--
-- Name: item_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.item_item_id_seq', 154, true);


--
-- Name: item_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.item_user_id_seq', 1, false);


--
-- Name: user_record_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_record_user_id_seq', 43, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (category_id);


--
-- Name: gator_message gator_message_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gator_message
    ADD CONSTRAINT gator_message_pkey PRIMARY KEY (message_id);


--
-- Name: item item_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT item_pkey PRIMARY KEY (item_id);


--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: user_record user_record_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_record
    ADD CONSTRAINT user_record_pkey PRIMARY KEY (user_id);


--
-- Name: user_record user_record_user_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_record
    ADD CONSTRAINT user_record_user_email_key UNIQUE (user_email);


--
-- Name: item fk_category; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES public.category(category_id) ON DELETE CASCADE;


--
-- Name: gator_message fk_item; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gator_message
    ADD CONSTRAINT fk_item FOREIGN KEY (item_id) REFERENCES public.item(item_id) ON DELETE CASCADE;


--
-- Name: item fk_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.item
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.user_record(user_id) ON DELETE CASCADE;


--
-- Name: gator_message fk_user_record; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.gator_message
    ADD CONSTRAINT fk_user_record FOREIGN KEY (user_id) REFERENCES public.user_record(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

