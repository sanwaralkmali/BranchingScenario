import Node


class Tree():

    def __init__(self):
        self.root = Node.Node('root', 'root', 'root')
        self.cursor = self.root

    @staticmethod
    def read_tree(tree, nfile):
        story = open(nfile + ".txt")
        nodes = story.readlines()
        for lines in nodes:
            param = lines.split('|')
            node = Node.Node(param[1], param[2], param[0])
            positions = param[0].split("-")
            tree.root.push_node(positions, 0, node)

