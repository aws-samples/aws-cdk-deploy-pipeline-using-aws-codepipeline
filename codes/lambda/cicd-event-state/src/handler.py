
def handle(event, context):
    print('event--->', event)
    
    print('stage', event['detail']['stage'])
    print('action', event['detail']['action'])
    print('state', event['detail']['state'])
    
    return 'ok'