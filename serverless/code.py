import json
import requests
from datetime import datetime, timedelta

url = 'https://api.exchangerate.host/latest?base=SGD'
ttm_rates = []
ttm_dates = []
history_dict = {}
current_dict = {}

num_months = 3

def lambda_handler(event, context):

    get_past_dates()
    get_current_rates()
    setup_history_dict()
    get_past_rates()
    recommended = get_recommended_rates()

    res = {}

    for currency in recommended:
        res[currency] = current_dict[currency]


    return json.dumps(res)  # Echo back the first key value
    #raise Exception('Something went wrong')

def get_past_rates():
    global history_dict

    for s in ttm_dates:
        history_url = 'https://api.exchangerate.host/' + s + '?base=SGD'
        res = requests.get(history_url)
        data = res.json()
        insert_past_rates(data["rates"])


def get_past_dates():
    current_month = datetime.now()
    for i in range (num_months):
        current_month = current_month.replace(day=1) - timedelta(days=1)
        current_month = current_month.replace(day=15)
        ttm_dates.append(current_month.strftime('%Y-%m-%d'))


def insert_past_rates(rates_dict):
    global history_dict

    #print(rates_dict)
    for currency in rates_dict:
        #print(currency)
        try:
            history_dict[currency].append(rates_dict[currency])
        except:
            pass

def get_current_rates():
    global current_dict

    response = requests.get(url)
    data = response.json()
    current_dict = data["rates"]

def setup_history_dict():
    for k in current_dict.keys():
        history_dict[k] = []


def get_recommended_rates():
    global history_dict
    result_set = []

    for currency in history_dict:
        prices = history_dict[currency]
        _avg = avg(prices)
        _curr = current_dict[currency]

        if _curr > _avg * 1.05:
            result_set.append(currency)

    return result_set


def avg(ls):
    return sum(ls)/len(ls)
