create table route(
    id serial not null primary key,
    routes text not null,
    fare int not null
);

create table taxi(
    id serial not null primary key,
    regNumber text not null,
    region_id int,
    foreign key (region_id) references region(id)
);

create table trip(
    id serial not null primary key,
    trips int not null,
    taxi_id int,
    route_id int,
    foreign key (taxi_id) references taxi(id),
    foreign key (route_id) references route(id)
);

create table region(
    id serial not null primary key,
    name text not null,
    route_id int,
    foreign key (route_id) reference route(id)
)
