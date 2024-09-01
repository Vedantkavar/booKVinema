from django.contrib import admin
from django.contrib.admin.sites import site
from authentication.models import MovieRecord , FinalData

class ServiceAdmin(admin.ModelAdmin):
 list_display = ('username', 'moviename', 'moviedate')

admin.site.register(MovieRecord,ServiceAdmin)

class finaldata(admin.ModelAdmin):
 list_display = ('username', 'moviename', 'movieyear' , 'amount' , 'count', 'seats')

admin.site.register(FinalData,finaldata)