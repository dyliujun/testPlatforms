import yaml
import os

'''根据key获取Yaml配置文件值'''
def getYamlValueForKey(key):
    # 获取当前脚本所在文件夹路径
    curPath = os.path.dirname(os.path.realpath(__file__))

    # 获取yaml文件路径
    yamlPath = os.path.join(curPath, "../config/cfgyaml.yaml")

    # open方法打开直接读出来
    f = open(yamlPath, 'r', encoding='utf-8')
    cfg = f.read()
    d = yaml.load(cfg, Loader=yaml.FullLoader)  # 用load方法转字典
    f.close()
    try:
        value = d[key]
    except KeyError:
        return "KeyNotFound"
    else:
        return value
