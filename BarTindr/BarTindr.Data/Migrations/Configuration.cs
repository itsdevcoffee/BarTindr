namespace BarTindr.Data.Migrations
{
    using Models;
    using Microsoft.AspNet.Identity.EntityFramework;
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Microsoft.AspNet.Identity;

    internal sealed class Configuration : DbMigrationsConfiguration<BarTindr.Data.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(BarTindr.Data.ApplicationDbContext context)
        {
            UserStore<ApplicationUser> userStore = new UserStore<ApplicationUser>(context);
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(userStore);

            Location[] location =
            {
                new Location { State = "Texas", City = "Houston", FullAddress = "707 Hunters Creek Way, Houston, TX 77450, USA", Latitude = 654.265465476587,  Longitude = 465.546543648398, IsActive = true, ZipCode = 77450, Country = "USA", Radius = 15, Name = "Work", Address = "707 Hunters Creek Way", IsCurrentLocation = false }
            };

            context.Locations.AddOrUpdate(l => l.State, location);

            Place[] place =
            {
                new Place { Name = "Chuy/'s", Rating = 10, IsOpen = false, Status = "Opens at 11 am", Phone = "725-555-2288", Address = "1714 Turkey Track Trail", City = "Sugar Land", State = "TX", Zip = 77854, CrossStreet = "Lexington & Concord", FullAddress = "1714 Turkey Track Trail, Sugar Land, TX 77854", Distance = 2, Latitude = 27.555, Longitude = 97.888, WebsiteUrl = "https://www.chuys.com/", Category = "Tex-Mex", Tier = 1, IsLiked = false, IsDisliked = false },
                new Place { Name = "Chimy/'s", Rating = 10, IsOpen = false, Status = "Closes at 12 am", Phone = "806-555-1584", Address = "2500 Broadway", City = "Lubbock", State = "TX", Zip = 79015, CrossStreet = "University", FullAddress = "2500 Broadway, Lubbock, TX 79015", Distance = 1, Latitude = 25.555, Longitude = 92.888, WebsiteUrl = "https://www.chimys.com/", Category = "Tex-Mex", Tier = 3, IsLiked = false, IsDisliked = false }
            };

            context.Places.AddOrUpdate(p => p.Name, place);

            var cade = userManager.FindByName("cadeawinter@gmail.com");

            if (cade == null)
            {
                cade = new ApplicationUser
                {
                    UserName = "cadeawinter@gmail.com",
                    Email = "cadeawinter@gmail.com",
                    IsDeleted = true
                };

                userManager.Create(cade, "123456");
            }

            var chris = userManager.FindByName("chrispena@gmail.com");

            if (chris == null)
            {
                chris = new ApplicationUser
                {
                    UserName = "chrispena@gmail.com",
                    Email = "chrispena@gmail.com",
                    IsDeleted = true
                };

                userManager.Create(chris, "123456");
            }
        }
    }
}
