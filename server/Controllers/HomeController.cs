using Microsoft.AspNetCore.Mvc;

namespace Default.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}