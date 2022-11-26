import Node from "./node";

export default class Graph extends EventTarget {

    public root : Node;
    public links : Map<Node, Set<Node>>;

    constructor(root : Node) {
        super();     this.root = root;
        this.links = new Map<Node, Set<Node>>();
    }

    link(a : Node, b : Node, directed : GraphType = GraphType.Undirected) {
        if (!this.links.has(a)) {
            this.links.set(a, new Set());
        }
            this.links.get(a)?.add(b);
        if (directed === GraphType.Undirected) {
            if (!this.links.has(b)) {
                this.links.set(b, new Set());
            }
            this.links.get(b)?.add(a);
        }
    }

    unlink(a : Node, b : Node, directed : GraphType = GraphType.Undirected) {
        if (this.links.has(a)) {
            this.links.get(a)?.delete(b);
        }

        if (this.links.has(b) && directed === GraphType.Undirected) {
            this.links.get(b)?.delete(a);
        }
    }
}

export enum GraphType {
    Undirected,
    Directed
}