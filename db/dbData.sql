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
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (category_id, category_name) VALUES (1, 'Electronics');
INSERT INTO public.category (category_id, category_name) VALUES (2, 'Books');
INSERT INTO public.category (category_id, category_name) VALUES (3, 'Games');
INSERT INTO public.category (category_id, category_name) VALUES (4, 'Clothes');


--
-- Data for Name: user_record; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_record (user_id, user_name, user_password, user_email, admin_right) VALUES (1, 'dwright', 'password', 'dwright2@mail.sfsu.edu', true);
INSERT INTO public.user_record (user_id, user_name, user_password, user_email, admin_right) VALUES (2, 'mmarti', 'password', 'mmarti30@mail.sfsu.edu', true);


--
-- Data for Name: item; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_image_thumbnail, item_availability) VALUES (1, 'iPhone X', 'Brand new iPhone X. Mint Condition!', '$500.00', 'Pending', 1, 1, 'https://c1.staticflickr.com/5/4459/38165638251_baaf861948_b.jpg', 'https://c1.staticflickr.com/5/4459/38165638251_baaf861948_b.jpg', true);
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_image_thumbnail, item_availability) VALUES (2, 'iPhone 5s', 'Nice iPhone 5s. Some damage', '$125.00', 'Pending', 2, 1, 'https://c1.staticflickr.com/8/7324/10542936505_e6e832b4a4_b.jpg', 'https://c1.staticflickr.com/8/7324/10542936505_e6e832b4a4_b.jpg', true);
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_image_thumbnail, item_availability) VALUES (3, 'Playstation 2', 'Late 2006 Playstation 2.', '$200.00', 'Pending', 2, 3, 'https://upload.wikimedia.org/wikipedia/commons/0/02/PS2-Fat-Console-Set.jpg', 'https://upload.wikimedia.org/wikipedia/commons/0/02/PS2-Fat-Console-Set.jpg', true);
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_image_thumbnail, item_availability) VALUES (4, 'Harry Potter Sorcerers Stone', 'Great condition Harry Potter book', '$12.00', 'Pending', 2, 2, 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Harry_Potter_Book_6%2C_1st_American_ed._without_dust_jacket.JPG', 'https://upload.wikimedia.org/wikipedia/commons/2/2e/Harry_Potter_Book_6%2C_1st_American_ed._without_dust_jacket.JPG', true);
INSERT INTO public.item (item_id, item_title, item_description, item_price, item_status, user_id, category_id, item_image, item_image_thumbnail, item_availability) VALUES (5, 'Military Jacket', 'Used military jacket.', '$300.00', 'Approved', 1, 4, 'https://upload.wikimedia.org/wikipedia/en/5/5d/US_Navy_G-2_Flight_Jacket.jpg', 'https://upload.wikimedia.org/wikipedia/en/5/5d/US_Navy_G-2_Flight_Jacket.jpg', true);


--
-- Data for Name: gator_message; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: dashboard; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: category_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.category_category_id_seq', 4, true);


--
-- Name: dashboard_dashboard_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dashboard_dashboard_id_seq', 1, false);


--
-- Name: dashboard_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dashboard_item_id_seq', 1, false);


--
-- Name: dashboard_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dashboard_message_id_seq', 1, false);


--
-- Name: dashboard_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dashboard_user_id_seq', 1, false);


--
-- Name: gator_message_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gator_message_item_id_seq', 1, false);


--
-- Name: gator_message_message_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gator_message_message_id_seq', 1, false);


--
-- Name: gator_message_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.gator_message_user_id_seq', 1, false);


--
-- Name: item_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_category_id_seq', 1, false);


--
-- Name: item_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_item_id_seq', 5, true);


--
-- Name: item_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.item_user_id_seq', 1, false);


--
-- Name: user_record_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_record_user_id_seq', 2, true);


--
-- PostgreSQL database dump complete
--


