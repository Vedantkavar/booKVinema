# Generated by Django 4.2.11 on 2024-04-18 03:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0004_finaldata_seats'),
    ]

    operations = [
        migrations.AddField(
            model_name='finaldata',
            name='date',
            field=models.CharField(default=12, max_length=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='finaldata',
            name='time',
            field=models.CharField(default=1, max_length=10),
            preserve_default=False,
        ),
    ]
