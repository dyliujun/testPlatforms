import hashlib
import time

from django.core.signing import BadSignature
from django.core import signing, cache

# settings.configure()

HEADER = {'typ': 'JWP', 'alg': 'default'}
KEY = "123456"
SALT = "www.lanou3g.com"
TIME_OUT = 30 * 60



def encrypt(obj):
    """加密"""
    enStr = signing.dumps(obj, key=KEY, salt=SALT)
    enStr64 = signing.b64_encode(enStr.encode()).decode()
    # print(enStr64)
    return enStr64


def decrypt(src):
    """解密"""
    src = signing.b64_decode(src.encode()).decode()
    try:
        raw = signing.loads(src, key=KEY, salt=SALT)
    except BadSignature:
        print("解密失败")
    else:
        print(raw)
        return raw


def create_token(username):
    """生成token信息"""

    # 1. 加密头信息
    header = encrypt(HEADER)

    # 2. 构造Payload
    payload = {"username": username, "iat": time.time()}
    payload = encrypt(payload)

    # 3. 生成签名
    md5 = hashlib.md5()
    md5.update(("%s.%s" % (header, payload)).encode())
    signature = md5.hexdigest()
    token = "%s.%s.%s" % (header, payload, signature)

    # 存储到缓存中
    # cache.set(username, token, TIME_OUT)
    # print(token)
    return token


def get_payload(token):
    payload = str(token).split('.')[1]
    payload = decrypt(payload)
    return payload


# 通过token获取用户名
def get_username(token):
    payload = get_payload(token)
    return payload['username']
    pass


def check_token(token):
    username = get_username(token)
    last_token = cache.get(username)
    if last_token:
        return last_token == token
    return False
