from django.db import models

class MovieRecord(models.Model):
    username = models.CharField(max_length=150)
    moviename = models.CharField(max_length=255)
    moviedate = models.CharField(max_length=10)

    # def __str__(self):
    #     return f"{self.username} - {self.moviname} on {self.moviedate}"

class FinalData(models.Model):
    username = models.CharField(max_length=150)
    moviename = models.CharField(max_length=255)
    movieyear = models.CharField(max_length=10)
    amount = models.CharField(max_length=50)
    count = models.CharField(max_length=50)
    seats = models.CharField(max_length=1000)


 


