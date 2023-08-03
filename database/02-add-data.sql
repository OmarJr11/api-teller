\c postgres

select pg_terminate_backend(pid) from pg_stat_activity WHERE datname='teller_story';

\c teller_story

\encoding UTF8

INSERT INTO system.users ( id, username, first_name, last_name, password, email, status ) 
values(1, 'admin', 'admin', 'admin', '123456789', 'admin@delivery.com', 'Active');

INSERT INTO system.roles (id, name, status, creator) 
values  (1, 'User', 'Active', 1),
        (2, 'Admin', 'Active', 1);

INSERT INTO system.user_roles (id, id_user, id_role, status, creator) 
values  (1, 1, 1, 'Active', 1);
