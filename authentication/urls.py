from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.home, name="home"),
    path('index', views.index, name="inedx"),

    path('searchPage', views.searchPage, name="searchPage"),
    path('bookingPage', views.bookingPage, name="bookingPage"),
    path('ticket', views.ticket, name="ticket"),

    path('signin', views.signin, name="signin"),
    path('signup', views.signup, name="signup"),
    path('signout', views.signout, name="signout"),

    path('saveMovieData', views.saveMovieData, name='saveMovieData'),
    path('saveFinalData', views.saveFinalData, name='saveFinalData'),
]
  