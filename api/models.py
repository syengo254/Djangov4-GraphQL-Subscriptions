from django.db import models

# Create your models here.

class Author(models.Model):
    name = models.CharField(max_length=150)

    def __str__(self) -> str:
        return self.name



class Book(models.Model):
    name = models.CharField(max_length=200)
    # author = models.ForeignKey(Author, on_delete=models.CASCADE, related_name="books")

    def __str__(self) -> str:
        return self.name

