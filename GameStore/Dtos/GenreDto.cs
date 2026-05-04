namespace GameStore.Dtos
{
    //Record was added in C# 9 and later, so Class was used instead. 
    //See more info: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/record
    public record GenreDto
   (
        int Id,
        string Name
   );
}
