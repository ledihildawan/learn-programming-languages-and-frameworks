show databases;

create database hello_world_db;

use hello_world_db;

select database();

create table cats(id int not null AUTO_INCREMENT PRIMARY KEY, name varchar(100), age int default 0);

show tables;

desc cats;

create table cats(name varchar(50), age int);

insert into cats(name, age) values('Blue', 1);
insert into cats(age, name) values(2, 'Draco');
insert into cats(name, age) values ('Peanut', 2), ('Butter', 4), ('Jelly', 7);

select * from cats;
select * from cats where id = age;
select * from cats where name = 'Blue';
update cats set age = 12 where name = 'Blue';
delete from cats where name = 'Blue';
delete from cats;

drop table cats;
drop database hello_world_db;
