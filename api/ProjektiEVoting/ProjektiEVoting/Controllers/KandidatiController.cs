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
    public class KandidatiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public KandidatiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select KandidatiId, KandidatiName,Subjekti,
                            convert(varchar(10),DateOfJoining,120) as DateOfJoining,PhotoFileName
                            from
                            dbo.Kandidati
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
        public JsonResult Post(Kandidati knd)
        {
            string query = @"
                           insert into dbo.Kandidati
                           (KandidatiName,Subjekti,DateOfJoining,PhotoFileName)
                    values (@KandidatiName,@Subjekti,@DateOfJoining,@PhotoFileName)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KandidatiName", knd.KandidatiName);
                    myCommand.Parameters.AddWithValue("@Subjekti", knd.Subjekti);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", knd.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", knd.PhotoFileName);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Kandidati knd)
        {
            string query = @"
                           update dbo.Kandidati
                           set KandidatiName= @KandidatiName,
                            Subjekti=@Subjekti,
                            DateOfJoining=@DateOfJoining,
                            PhotoFileName=@PhotoFileName
                            where KandidatiId=@KandidatiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KandidatiId", knd.KandidatiId);
                    myCommand.Parameters.AddWithValue("@KandidatiName", knd.KandidatiName);
                    myCommand.Parameters.AddWithValue("@Subjekti", knd.Subjekti);
                    myCommand.Parameters.AddWithValue("@DateOfJoining", knd.DateOfJoining);
                    myCommand.Parameters.AddWithValue("@PhotoFileName", knd.PhotoFileName);
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
                           delete from dbo.Kandidati
                            where KandidatiId=@KandidatiId
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@KandidatiId", id);

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