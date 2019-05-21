class Node:
    maxChildren = 2

    def __init__(self, option, message, position):
        self.message = message
        self.option = option
        self.children = [None]*self.maxChildren
        self.position = position

    def add_child(self, position, node):
        if position < 0 or position > self.maxChildren-1:
            raise ValueError
        else:
            self.children[position] = node

    def push_node(self, positions, depth, node):
        if depth == len(positions) - 1:
            d = int(positions[depth])
            self.add_child(d - 1, node)
        else:
            p = self.children[int(positions[depth])-1]
            p.push_node(positions, depth+1, node)

    def child(self, num):
        if int(num) < 0 or int(num) > 2:
            raise ValueError
        return self.children[int(num)-1]

    def child_exists(self, num):
        if int(num) < 0 or int(num) > self.maxChildren-1:
            raise ValueError
        else:
            return self.children[num-1] is not None

    def print_child_options(self):
        n = 0
        for i in range(1, self.maxChildren):
            if self.child_exists(i):
                n += 1
        return n
