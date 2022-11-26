using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ProjektiEVoting.Models;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace ProjektiEVoting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KomisioneriController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public KomisioneriController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select KomisioneriID, KomisioneriName,Shteti,Qyteti,NrPersonal,Email,NrTelefonit,
                            convert(varchar(10),DateOfJoining,120) as DateOfJoining
                            from
                            dbo.Komisioneri
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Komisioneri kms)
        {
            string query = @"
                           insert into dbo.Komisioneri
                           (KomisioneriName,DateOfJoining,Shteti,Qyteti,NrPersonal,Email,NrTelefonit)
                    values (@KomisioneriName,@DateOfJoining,@Shteti,@Qyteti,@NrPersonal,@Email,@NrTelefonit)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KomisioneriName", kms.KomisioneriName);
                    myCommand.Parameters.AddWithValue("@Shteti", kms.Shteti);
                    myCommand.Parameters.AddWithValue("@Qyteti", kms.Qyteti);
                    myCommand.Parameters.AddWithValue("@NrPersonal", kms.NrPersonal);
                    myCommand.Parameters.AddWithValue("@Email", kms.Email);
                    myCommand.Parameters.AddWithValue("@NrTelefonit", kms.NrTelefonit);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", kms.DateOfJoining);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Komisioneri kms)
        {
            string query = @"
                           update dbo.Komisioneri
                           set KomisioneriName= @KomisioneriName,
                            Shteti=@Shteti,
                            Qyteti=@Qyteti,
                            NrPersonal=@NrPersonal,
                            Email=@Email,
                            NrTelefonit=@NrTelefonit
                            DateOfJoining=@DateOfJoining,
                            where KomisioneriID=@KomisioneriID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KomisioneriID", kms.KomisioneriID);
                    myCommand.Parameters.AddWithValue("@KomisioneriName", kms.KomisioneriName);
                    myCommand.Parameters.AddWithValue("@Shteti", kms.Shteti);
                    myCommand.Parameters.AddWithValue("@Qyteti", kms.Qyteti);
                    myCommand.Parameters.AddWithValue("@NrPersonal", kms.NrPersonal);
                    myCommand.Parameters.AddWithValue("@Email", kms.Email);
                    myCommand.Parameters.AddWithValue("@NrTelefonit", kms.NrTelefonit);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", kms.DateOfJoining);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Updated Successfully");
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                           delete from dbo.Komisioneri
                            where KomisioneriID=@KomisioneriID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KomisioneriID", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }


        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {

                return new JsonResult("anonymous.png");
            }
        }
    }
}
