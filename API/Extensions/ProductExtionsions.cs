using API.Entities;

namespace API.Extensions;

public static class ProductExtensions
{
    public static IQueryable<Product> Sort(this IQueryable<Product> query, string? orderBy)
    {
        return orderBy switch 
        {
            "price" => query.OrderBy(p => p.Price),
            "priceDesc" => query.OrderByDescending(p => p.Price),
            _ => query.OrderBy(p => p.Name)
        };
    }

    public static IQueryable<Product> Search(this IQueryable<Product> query, string? searchTerm)
    {
        if(string.IsNullOrEmpty(searchTerm)) return query;
        var lowerCaseSearchTerm = searchTerm.Trim().ToLower();
        return query.Where(p => p.Name.ToLower().Contains(lowerCaseSearchTerm));
    }

    public static IQueryable<Product> Filter(this IQueryable<Product> query, 
    string? brands , string? types)
    {
        var brandList = new List<string>();
        var typeList = new List<string>();

        if(!string.IsNullOrEmpty(brands)) brandList.AddRange([.. brands.ToLower().Split(",").ToList()]);
        if(!string.IsNullOrEmpty(types)) typeList.AddRange([.. types.ToLower().Split(",").ToList()]);

        query = query.Where(x => brandList.Count == 0 || brandList.Contains(x.Brand.ToLower()));
        query = query.Where(x => typeList.Count == 0 || typeList.Contains(x.Type.ToLower()));

        return query;
    }
  

}

