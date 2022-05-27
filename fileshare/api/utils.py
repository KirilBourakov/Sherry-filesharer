import yagmail

def sendmail(data, sender, content):
    try:
        contents = f"Email sent by {sender} \n {content} "
        email = yagmail.SMTP('cherrybot61@gmail.com')
        email.send('kirbou06012@gmail.com', data['Subject'], contents)
        return True
    except:
        return False
    
def checkemptycontent(items):
    for item in items:
        if item.strip() == '':
            return False
    return True