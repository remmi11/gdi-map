from django.conf.urls import url
from . import views
from django.contrib import admin
from django.urls import path, include

from django.contrib.auth.views import (logout, login)


urlpatterns = [
    url(r'^map/$', views.show_map, name='show_map'),

    url(r'^$', login, name='login'),
    url(r'^logout/$', logout, name='logout'),

	# change password urls
    url(r'^update-profile/(?P<pk>\d+)/$', views.update_profile, name='update_profile'),

    url(r'^user/$', views.user_list, name='user_list'),
    url(r'^user/new/$', views.user_new, name='user_new'),
    url(r'^user/(?P<pk>\d+)/edit/$', views.user_edit, name='user_edit'),
    url(r'^user/(?P<pk>\d+)/remove/$', views.user_remove, name='user_remove'),
]