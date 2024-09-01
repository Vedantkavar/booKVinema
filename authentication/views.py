from django.shortcuts import redirect, render
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from gfg import settings
from django.core.mail import send_mail
from authentication.models import MovieRecord , FinalData
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.exceptions import ValidationError
from django.views.decorators.csrf import csrf_exempt

import authentication

# python manage.py makemigration
# python manage.py migrate
# python manage.py runserver

# Create your views here. 
def home(request):
  return render(request, "index2.html")
  
def index(request):
  return render(request, "index2.html")

def searchPage(request):
  return render(request, "searchPage.html")

def bookingPage(request):
  CurrentUser = request.user.username
  movie = MovieRecord.objects.filter(username=CurrentUser)
  a = len(movie)-1
  return render(request, "bookingPage.html",{'movie' : movie[a].moviename})

def ticket(request):
  CurrentUser = request.user.username
  x = MovieRecord.objects.filter(username=CurrentUser)
  movie = FinalData.objects.filter(username=CurrentUser)
  a = len(movie)-1
  return render(request, "ticket.html",{'username' : CurrentUser, 'moviename' : movie[a].moviename , 'movieyear' : movie[a].movieyear , 'amount' : movie[a].amount , 'seats' : movie[a].seats , 'count' : movie[a].count})

 


def signup(request):

  if request.method == "POST":
    username = request.POST["username"]
    fname = request.POST["fname"]
    lname = request.POST["lname"]
    email = request.POST["email"]
    pass1 = request.POST["pass1"]
    pass2 = request.POST["pass2"]
    
    if User.objects.filter(username=username):
      messages.error(request, "Username already exist! Please try some other username")
      return redirect('home')

    if User.objects.filter(email=email):
      messages.error(request, "Email alreay registeres!")
      return redirect('home')

    if len(username)>15:
      messages.error(request, "Username must be under 10 characters..")
      return redirect('home')

    if pass1 != pass2:
      messages.error(request, "Passwords didn't match!")
      return redirect('home')

    if not username.isalnum():
      messages.error(request, "Username must be Alpha-Numeric!")
      return redirect('home')

    myuser = User.objects.create_user(username,email,pass1)
    myuser.first_name = fname
    myuser.last_name = lname

    myuser.save()

    messages.success(request, "Your account has been successfully created.\n" + "Now Login to continue...")
 
    return redirect('home')

  return render(request, "index2.html")

def signin(request):

    if request.method == 'POST' : 
      username = request.POST["username"]
      pass1 = request.POST["pass1"]

      user = authenticate(username=username, password=pass1)

      if user is not None :
        login(request, user)
        fname = user.first_name
        messages.success(request, "Logged In Successfully!")
        return render(request, "index2.html" , {'fname' : fname , 'USERNAME' : username})
      
      else:
        messages.error(request, "Wrong  Credentials!")
        return redirect('home') 

    return render(request, "inedx2.html")

def signout(request):
  logout(request)
  messages.success(request, "Logged Out Successfully!")
  return redirect('home')




@csrf_exempt
def saveMovieData(request):
    
    if request.method == 'POST':
        try:
            # Load the JSON data from the request body
            data = json.loads(request.body)

            # Extract data from JSON
            username = data.get('currentUserName')
            moviename = data.get('movieName')
            moviedate = data.get('movieYear')

            # Create a new MovieRecord instance and save it to the database
            movie_record = MovieRecord(username=username, moviename=moviename, moviedate=moviedate)
            movie_record.full_clean()  
            movie_record.save()

            # Return a success response
            return JsonResponse({'message': 'Movie record created successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except ValidationError as e:
            return JsonResponse({'error': e.messages}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Method Not Allowed'}, status=405)

@csrf_exempt
def saveFinalData(request):
    
    if request.method == 'POST':
        try:
            # Load the JSON data from the request body
            data = json.loads(request.body)

            # Extract data from JSON 
            username = data.get('username')
            moviename = data.get('moviename')
            movieyear = data.get('movieyear')
            amount = data.get('amount')
            count = data.get('count')
            seats = data.get('seats')

            # Create a new MovieRecord instance and save it to the database
            final_record = FinalData(username=username, moviename=moviename, movieyear=movieyear, amount=amount, count=count , seats=seats )
            final_record.full_clean()  
            final_record.save()

            # Return a success response
            return JsonResponse({'message': 'Final record created successfully'}, status=201)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        except ValidationError as e:
            return JsonResponse({'error': e.messages}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    else:
        return JsonResponse({'error': 'Method Not Allowed'}, status=405)

