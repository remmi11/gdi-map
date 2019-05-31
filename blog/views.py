from django.shortcuts import render, get_object_or_404
from .forms import UserForm, UserEditForm
from django.shortcuts import redirect
from django.shortcuts import render
from .models import *

import json
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth.models import User
from django.db import connection

@login_required
def show_map(request):
    geo_json = getGeoSql()

    if geo_json['features']:
        for feature in geo_json['features']:
            if feature['properties']['status'] == 0:
                feature['properties']['COLOR'] = "#777777"
            elif feature['properties']['status'] == 1:
                feature['properties']['COLOR'] = "#ff9600"
            elif feature['properties']['status'] == 2:
                feature['properties']['COLOR'] = "#fd05ae"
            elif feature['properties']['status'] == 3:
                feature['properties']['COLOR'] = "#1077bd"
            else:
                feature['properties']['COLOR'] = "#c52148"

    geo_json = json.dumps(geo_json)
    return render(request, 'blog/map.html', {'geo_json': geo_json})

def getGeoSql():
    sql = '''SELECT row_to_json(fc)
        FROM ( SELECT 'FeatureCollection' As type, array_to_json(array_agg(f)) As features
        FROM (SELECT 'Feature' As type, 
            ST_AsGeoJSON(subs.wkb_geometry)::json As geometry, st_area(subs.wkb_geometry) as area,
            (
                select row_to_json(t) 
                from (select subs.status as status) t
            )
        As properties
        FROM subs ) As f ) As fc;'''

    with connection.cursor() as cursor:
        cursor.execute(sql)
        row = cursor.fetchone()

        row = row[0]
        return row

    return []

@login_required
def user_list(request):

    if not request.user.is_superuser:
        return redirect('/')

    # filter(published_date__lte=timezone.now()).order_by('published_date')
    users = Users.objects.all().order_by('pk')
    return render(request, 'registration/user_list.html', {'users': users})

@login_required
def user_new(request):
    if not request.user.is_superuser:
        return redirect('/')

    if request.method == "POST":
        form = UserForm(request.POST)
        if form.is_valid():
            new_user = form.save(commit=False)
            new_user.set_password(
            form.cleaned_data['password'])
            new_user.save()

            return redirect('/user/')
    else:
        form = UserForm()
    return render(request, 'registration/user_new.html', {'user_form': form})

@login_required
def user_edit(request, pk):
    if not request.user.is_superuser:
        return redirect('/')

    users = Users.objects.all()
    user = get_object_or_404(Users, pk=pk)
    if request.method == "POST":
        form = UserEditForm(request.POST, instance=user)
        if form.is_valid():
            user = form.save(commit=False)
            if request.POST.get('new_password') != "":
                user.set_password(request.POST.get('new_password'))
            user.save()
            return redirect('/user/')
    else:
        form = UserEditForm(instance=user)
    return render(request, 'registration/user_edit.html', {'user_form': form})

@login_required
def update_profile(request, pk):
    if not request.user.pk != pk: 
        return redirect('/')
    
    users = Users.objects.all()
    user = get_object_or_404(Users, pk=pk)

    if request.method == "POST":
        form = UserEditForm(request.POST, instance=user)
        if form.is_valid():
            user = form.save(commit=False)
            if request.POST.get('new_password') != "":
                user.set_password(request.POST.get('new_password'))
            user.save()
            return redirect('/user/')
    else:
        form = UserEditForm(instance=user)
    return render(request, 'registration/update_profile.html', {'user_form': form})


@login_required
def user_remove(request, pk):
    if not request.user.is_superuser:
        return redirect('/')

    user = get_object_or_404(Users, pk=pk)
    if user:
        user.delete()

    return redirect('/user/')


class AuthenticationEmailBackend(object):
    def authenticate(self, username=None, password=None, **kwargs):
        try:
            user = Users.objects.get(email=username)
        except Users.DoesNotExist:
            return None
        else:
            if getattr(user, 'is_active', False) and user.check_password(password):
                return user
        return None

    def get_user(self, user_id):
        try:
            return Users.objects.get(pk=user_id)
        except Users.DoesNotExist:
            return None