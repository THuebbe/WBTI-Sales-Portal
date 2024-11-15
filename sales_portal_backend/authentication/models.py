from django.db import models

class User(models.Model):
    username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50, choices=[('user', 'User'), ('admin', 'Admin')])

    def __str__(self):
        return self.username