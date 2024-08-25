#!/usr/bin/python3

import cgi
import urllib.parse
import webbrowser

print("Content-Type: text/html\n")

form = cgi.FieldStorage()
query = form.getvalue('query')

if query:
    # Encode the query to make it URL-friendly
    encoded_query = urllib.parse.quote_plus(query)
    
    # Redirect to Google search
    google_url = f"https://www.google.com/search?q={encoded_query}"
    
    # HTML to redirect the user
    print(f"""
    <html>
    <head>
        <meta http-equiv="refresh" content="0; url={google_url}">
        <title>Redirecting...</title>
    </head>
    <body>
        <p>If you are not redirected, <a href="{google_url}">click here</a>.</p>
    </body>
    </html>
    """)
else:
    print("""
    <html>
    <head>
        <title>Error</title>
    </head>
    <body>
        <p>No query was provided.</p>
    </body>
    </html>
    """)

