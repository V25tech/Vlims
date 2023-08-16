using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Azure.Storage.Blobs.Models;
using Vlims.DocumentManager.Manager.Interface;
using Azure;
using Microsoft.Extensions.Configuration;

namespace Vlims.DocumentManager.Manager
{
    public class AzureBlobService : IAzureBlobService
    {
        BlobServiceClient _blobClient;
        BlobContainerClient _containerClient;
        private readonly IConfiguration _configuration;
        public AzureBlobService(IConfiguration configuration)
        {
            _configuration = configuration;
           string azureConnectionString = _configuration.GetSection("StorageConnectionString").Value;
           string containerName = _configuration.GetSection("ContainerName").Value;

            _blobClient = new BlobServiceClient(azureConnectionString);
            _containerClient = _blobClient.GetBlobContainerClient(containerName);
        }

        public async Task<Response<BlobContentInfo>> UploadFiles(IFormFile file, string fileName)
        {
            Response<BlobContentInfo> azureResponse;
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                memoryStream.Position = 0;
                azureResponse = await _containerClient.UploadBlobAsync(fileName, memoryStream, default);
            }
            return azureResponse;
        }

        public async Task<List<BlobItem>> GetUploadedBlobs()
        {
            var items = new List<BlobItem>();
            var uploadedFiles = _containerClient.GetBlobsAsync();
            await foreach (BlobItem file in uploadedFiles)
            {
                items.Add(file);
            }

            return items;
        }

        public byte[] GetFileFromAzure(string fileName)
        {

            BlobClient blobClient = _containerClient.GetBlobClient(fileName);

            if (blobClient.ExistsAsync().Result)
            {
                using (var ms = new MemoryStream())
                {
                    blobClient.DownloadTo(ms);
                    return ms.ToArray();
                }
            }
            return new byte[0];  // returns empty array
        }
    }
}
