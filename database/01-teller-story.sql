\c postgres

select pg_terminate_backend(pid) from pg_stat_activity WHERE datname='teller_story';

DROP DATABASE if exists teller_story;
CREATE DATABASE teller_story
WITH ENCODING = "UTF8"
CONNECTION LIMIT = -1;

\c teller_story

\encoding UTF8

CREATE SCHEMA system;

CREATE DOMAIN dec_nonnegative   DECIMAL(18,4) CHECK(VALUE >= 0.0000);

CREATE TABLE system.users (
    id                  BIGSERIAL       NOT NULL,

    username            VARCHAR(50)    NOT NULL,
    password            VARCHAR(100)    NOT NULL,
    email               VARCHAR(100)    NOT NULL,
    status              VARCHAR(50)     NOT NULL,

    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    last_login          TIMESTAMP       NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (modifier)  REFERENCES system.users(id)
);

CREATE UNIQUE INDEX users_email_uq ON system.users USING btree(lower(email)) WHERE status <> 'Deleted';

CREATE TABLE system.roles (
    id                  SERIAL		    NOT NULL,

    name     			VARCHAR(50)	    NOT NULL,
	status				VARCHAR(50)	    NOT NULL,

    creator             BIGINT          NOT NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    PRIMARY KEY (id),
	UNIQUE(name),
    FOREIGN KEY (creator)   REFERENCES system.users(id),
    FOREIGN KEY (modifier)  REFERENCES system.users(id)
);

CREATE TABLE system.permissions (
    id                  SERIAL		    NOT NULL,

    name     			VARCHAR(50)	    NOT NULL,
	status				VARCHAR(50)	    NOT NULL,
	type				VARCHAR(50)	    NOT NULL,

    creator             BIGINT          NOT NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    PRIMARY KEY (id),
	UNIQUE(name,type),
    FOREIGN KEY (creator)   REFERENCES system.users(id),
    FOREIGN KEY (modifier)  REFERENCES system.users(id)
);

CREATE TABLE system.role_permissions (
    id              BIGSERIAL   NOT NULL,
    id_role         INT         NOT NULL,
	id_permission   INT         NOT NULL,

    creator         BIGINT      NOT NULL,
    creation_date   TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE(id_role, id_permission),
    FOREIGN KEY (id_role)     	REFERENCES system.roles(id),
    FOREIGN KEY (id_permission)	REFERENCES system.permissions(id),
    FOREIGN KEY (creator)	    REFERENCES system.users(id)
);

CREATE TABLE system.user_roles (
    id       BIGSERIAL      NOT NULL,

    id_user  BIGINT 	    NOT NULL,
	id_role  BIGINT 	    NOT NULL,
	status   VARCHAR(50)    NOT NULL,

    creator             BIGINT          NOT NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    PRIMARY KEY(id),
    UNIQUE (id_user, id_role),
    FOREIGN KEY (id_role)      REFERENCES system.roles(id),
    FOREIGN KEY (id_user)    REFERENCES system.users(id),
    FOREIGN KEY (creator)   REFERENCES system.users(id),
    FOREIGN KEY (modifier)  REFERENCES system.users(id)
);

CREATE TABLE stories (
    id                  BIGSERIAL       NOT NULL,

    title               VARCHAR(150)    NOT NULL,
    "text"              TEXT            NOT NULL,
    "like"              BIGINT          NOT NULL DEFAULT 0,
    status              VARCHAR(50)     NOT NULL,

    creator             BIGINT          NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    PRIMARY KEY(id),
    FOREIGN KEY (creator)   REFERENCES system.users(id),
    FOREIGN KEY (modifier)  REFERENCES system.users(id)
);

CREATE TABLE comments (
    id                  BIGSERIAL       NOT NULL,

    id_story            BIGINT          NOT NULL,
    "text"              TEXT            NOT NULL,
    "like"              BIGINT          NOT NULL DEFAULT 0,
    status              VARCHAR(50)     NOT NULL,

    creator             BIGINT          NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    modifier            BIGINT          NULL,
    modification_date   TIMESTAMP       NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (id_story)          REFERENCES public.stories(id),
    FOREIGN KEY (creator)           REFERENCES system.users(id),
    FOREIGN KEY (modifier)          REFERENCES system.users(id)
);

CREATE TABLE like_stories (
    id_story            BIGINT          NOT NULL,
    status              VARCHAR(50)     NOT NULL,

    creator             BIGINT          NULL,
    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_story, creator),
    FOREIGN KEY (id_story)          REFERENCES public.stories(id),
    FOREIGN KEY (creator)           REFERENCES system.users(id)
);

CREATE TABLE system.refresh_tokens(
    id_user             BIGINT          NOT NULL,
    token               VARCHAR(400)    NOT NULL,
    refresh             VARCHAR(400)    NOT NULL,
    expire              TIMESTAMP       NOT NULL,

    creation_date       TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id_user, token),
    FOREIGN KEY (id_user) REFERENCES system.users(id)
);