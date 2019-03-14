class Demo:
    def __init__(self):
        print('我是init方法')
    
    def __new__(self):
        print('我是new方法')
        return self.__init__(self)
    
    def __del__(self):
        print('我是del方法')

d1 = Demo()
