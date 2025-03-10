﻿
using Microsoft.AspNetCore.Mvc;

namespace Comany_Managment_System_MVC_.Services.ViewModels.Employees
{
    public class CommonEmployeeVM
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = null!;

        [Required]
        [MaxLength(50)]
        [Remote(action: "IsEmailUnique",
            controller: "Employees",
            AdditionalFields = "Id",
            ErrorMessage = "This email is already used.")]
        public string Email { get; set; } = null!;

        [Required]
        [MaxLength(50), MinLength(3)]
        public string Address { get; set; } = null!;

        [Required]
        [Range(20, 64)]
        public int Age { get; set; }

        [Required]
        [Range(6000, 100_000)]
        public decimal Salary { get; set; }

        [Required]
        [Display(Name = "Gender")]
        public int Gender { get; set; }

        [Required]
        [MinLength(5), MaxLength(50)]
        [Display(Name = "Job Title")]
        public string JobTitle { get; set; } = string.Empty;

        public IEnumerable<SelectListItem> GenderSelectList { get; set; } = Enumerable.Empty<SelectListItem>();

        [Required]
        [Display(Name = "Department")]
        public int DepartmentId { get; set; }

        public IEnumerable<SelectListItem> Departments { get; set; } = Enumerable.Empty<SelectListItem>();

        [Display(Name = "Projects")]
        public List<int> SelectedProjects { get; set; } = default!;

        public IEnumerable<SelectListItem> Projects = Enumerable.Empty<SelectListItem>();
    }
}
