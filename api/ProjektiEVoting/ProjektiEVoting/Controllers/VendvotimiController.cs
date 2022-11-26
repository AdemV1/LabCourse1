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
    public class VendvotimiController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public VendvotimiController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                            select VendvotimiID,VendvotimiName,VendvotimiKodi
                            from
                            dbo.Vendvotimi
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
        public JsonResult Post(Vendvotimi vv)
        {
            string query = @"
                           insert into dbo.Vendvotimi
                           (VendvotimiName,VendvotimiKodi)
                    values (@VendvotimiName,@VendvotimiKodi)
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VendvotimiName", vv.VendvotimiName);
                    myCommand.Parameters.AddWithValue("@VendvotimiKodi", vv.VendvotimiKodi);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Added Successfully");
        }


        [HttpPut]
        public JsonResult Put(Vendvotimi vv)
        {
            string query = @"
                           update dbo.Vendvotimi
                           set VendvotimiName= @VendvotimiName,
                           VendvotimiKodi=@VendvotimiKodi
                           where VendvotimiID=@VendvotimiID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VendvotimiID", vv.VendvotimiID);
                    myCommand.Parameters.AddWithValue("@VendvotimiName", vv.VendvotimiName);
                    myCommand.Parameters.AddWithValue("@VendvotimiKodi", vv.VendvotimiKodi);
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
                           delete from dbo.Vendvotimi
                            where VendvotimiID=@VendvotimiID
                            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("KandidatiAppCon");
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@VendvotimiID", id);

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
       

