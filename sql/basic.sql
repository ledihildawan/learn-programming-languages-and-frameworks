show databases;

create database hello_world_db;
use hello_world_db;
select database();
create table cats(name varchar(100), age int);
show tables;
desc cats;
drop table cats;
drop database hello_world_db;
