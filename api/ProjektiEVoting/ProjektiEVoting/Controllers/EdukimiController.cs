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
    public class EdukimiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public EdukimiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select EdukimiID,EdukimiName,Institucioni
                            from
                            dbo.Edukimi
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
        public JsonResult Post(Edukimi edu)
        {
            string query = @"
                           insert into dbo.Edukimi
                           (EdukimiName,Institucioni)
                    values (@EdukimiName,@Institucioni)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EdukimiName", edu.EdukimiName);
                    myCommand.Parameters.AddWithValue("@Institucioni", edu.Institucioni);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Edukimi edu)
        {
            string query = @"
                           update dbo.Edukimi
                           set EdukimiName= @EdukimiName,
                           Institucioni=@Institucioni,
                           where EdukimiID=@EdukimiID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EdukimiID", edu.EdukimiID);
                    myCommand.Parameters.AddWithValue("@EdukimiName", edu.EdukimiName);
                    myCommand.Parameters.AddWithValue("@Institucioni", edu.Institucioni);
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
                           delete from dbo.Edukimi
                            where EdukimiID=@EdukimiID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EdukimiID", id);

                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Deleted Successfully");
        }
    }
}
