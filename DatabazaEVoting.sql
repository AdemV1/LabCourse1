create database EVoting	
use EVoting

create table Subjekti(
SubjektiID int identity (1,1),
SubjektiName nvarchar (500)
)

insert into Subjekti values ('Subjekti1')
insert into Subjekti values ('Subjekti2')


CREATE TABLE Kandidati(
	KandidatiId int IDENTITY(1,1) ,
	KandidatiName nvarchar(500) ,
	Subjekti nvarchar(500) ,
	DateOfJoining datetime ,
	Shteti nvarchar (500),
	Qyteti nvarchar (500),
	PhotoFileName nvarchar(500) 
)

INSERT into Kandidati values ('1', 'Kandidati 1', 'Subjekti 1', '10-10-2022', 'Kosove', 'Prishtine', 'evoting.jpg')
INSERT into Kandidati values ('1', 'Kandidati 2', 'Subjekti 2', '10-12-2022', 'Kosove', 'Prizren', 'evoting.jpg')


select * from Subjekti
select * from Kandidati

CREATE TABLE Shteti(
Shteti_ID int identity (1,1),
ShtetiName nvarchar (500),
Shteti_shkurtesa nvarchar(10)

)
select * from Shteti

CREATE TABLE Qyteti(
Qyteti_ID int identity (1,1),
QytetiName nvarchar (500),
Qyteti_shkurtesa nvarchar(10)

)
select * from Qyteti

CREATE TABLE ZipCode(
ZIP_ID int identity (1,1),
ZIP_Kodi int ,
Qyteti nvarchar(500)
)

CREATE TABLE Votuesi (
	VotuesiId int IDENTITY(1,1) ,
	VotuesiName nvarchar(500) ,
	DateOfJoining datetime ,
	Shteti nvarchar (500),
	Qyteti nvarchar (500),
	NrPersonal int,
	Email nvarchar (100),
	NrTelefonit nvarchar (100),
	Kategoria nvarchar (200)
)