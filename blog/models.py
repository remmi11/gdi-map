from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import AbstractUser

class Subs(models.Model):
    ogc_fid = models.AutoField(primary_key=True)
    objectid = models.IntegerField(blank=True, null=True)
    shape_leng = models.IntegerField(blank=True, null=True)
    shape_area = models.IntegerField(blank=True, null=True)
    shape_leng = models.IntegerField(blank=True, null=True)
    subdivisio = models.CharField(max_length=50, blank=True, null=True)
    block = models.CharField(max_length=50, blank=True, null=True)
    unit = models.CharField(max_length=50, blank=True, null=True)
    lot = models.CharField(max_length=50, blank=True, null=True)
    county = models.CharField(max_length=50, blank=True, null=True)
    status = models.IntegerField(blank=True, null=True)
    developer = models.CharField(max_length=50, blank=True, null=True)
    acres = models.IntegerField(blank=True, null=True)
    wkb_geometry = models.TextField(blank=True, null=True) 

    class Meta:
        db_table = 'subs'

class Users(AbstractUser):
    # email = models.CharField(max_length=255, blank=True, null=True)
    # password = models.CharField(max_length=255, blank=True, null=True)
    remember_token = models.CharField(max_length=100, blank=True, null=True)
    role_id = models.IntegerField(blank=True, null=True)
    edit_auth = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        super(Users, self).save(*args, **kwargs)
