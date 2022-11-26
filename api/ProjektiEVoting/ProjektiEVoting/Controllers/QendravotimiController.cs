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
    public class QendravotimiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public QendravotimiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select QendravotimiID,QendravotimiName,QendravotimiKodi
                            from
                            dbo.Qendravotimi
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
        public JsonResult Post(Qendravotimi qv)
        {
            string query = @"
                           insert into dbo.Qendravotimi
                           (QendravotimiName,QendravotimiKodi)
                    values (@QendravotimiName,@QendravotimiKodi)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@QendravotimiName", qv.QendravotimiName);
                    myCommand.Parameters.AddWithValue("@QendravotimiKodi", qv.QendravotimiKodi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Qendravotimi qv)
        {
            string query = @"
                           update dbo.Qendravotimi
                           set QendravotimiName= @QendravotimiName,
                           QendravotimiKodi=@QendravotimiKodi,
                           where QendravotimiID=@QendravotimiID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@QendravotimiID", qv.QendravotimiID);
                    myCommand.Parameters.AddWithValue("@QendravotimiName", qv.QendravotimiName);
                    myCommand.Parameters.AddWithValue("@QendravotimiKodi", qv.QendravotimiKodi);
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
                           delete from dbo.Qendravotimi
                            where QendravotimiID=@QendravotimiID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@QendravotimiID", id);

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
