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
    public class VotuesiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public VotuesiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select VotuesiId, VotuesiName,Shteti,Qyteti,NrPersonal,Email,NrTelefonit,Kategoria,
                            convert(varchar(10),DateOfJoining,120) as DateOfJoining
                            from
                            dbo.Votuesi
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
        public JsonResult Post(Votuesi vot)
        {
            string query = @"
                           insert into dbo.Votuesi
                           (VotuesiName,DateOfJoining,Shteti,Qyteti,NrPersonal,Email,NrTelefonit,Kategoria)
                    values (@VotuesiName,@DateOfJoining,@Shteti,@Qyteti,@NrPersonal,@Email,@NrTelefonit,@Kategoria)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VotuesiName", vot.VotuesiName);
                    myCommand.Parameters.AddWithValue("@Shteti", vot.Shteti);
                    myCommand.Parameters.AddWithValue("@Qyteti", vot.Qyteti);
                    myCommand.Parameters.AddWithValue("@NrPersonal", vot.NrPersonal);
                    myCommand.Parameters.AddWithValue("@Email", vot.Email);
                    myCommand.Parameters.AddWithValue("@NrTelefonit", vot.NrTelefonit);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", vot.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@Kategoria", vot.Kategoria);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Votuesi vot)
        {
            string query = @"
                           update dbo.Votuesi
                           set VotuesiName= @VotuesiName,
                            Shteti=@Shteti,
                            Qyteti=@Qyteti,
                            NrPersonal=@NrPersonal,
                            Email=@Email,
                            NrTelefonit=@NrTelefonit
                            DateOfJoining=@DateOfJoining,
                            Kategoria = @Kategoria
                            where VotuesiId=@VotuesiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VotuesiId", vot.VotuesiId);
                    myCommand.Parameters.AddWithValue("@VotuesiName", vot.VotuesiName);
                    myCommand.Parameters.AddWithValue("@Shteti", vot.Shteti);
                    myCommand.Parameters.AddWithValue("@Qyteti", vot.Qyteti);
                    myCommand.Parameters.AddWithValue("@NrPersonal", vot.NrPersonal);
                    myCommand.Parameters.AddWithValue("@Email", vot.Email);
                    myCommand.Parameters.AddWithValue("@NrTelefonit", vot.NrTelefonit);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", vot.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@Kategoria", vot.Kategoria);
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
                           delete from dbo.Votuesi
                            where VotuesiId=@VotuesiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VotuesiId", id);

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
