export default abstract class Node extends EventTarget {
    public parent : Node|null;
    public state : object;
    public readonly id : string|null;
    public props : object;
    public children! : Node[];

    public static readonly stateChangeEvent : Event = new Event("onstatechange");
    public static readonly mountEvent : Event = new Event("onmount");
    public static readonly dismountEvent : Event = new Event("ondismount");
    public static readonly linkEvent : Event = new Event("onlink");
    public static readonly unLinkEvent : Event = new Event("onunlink");

    protected constructor({id, ...props}: { id?: string, props: any }, children : Node[]) {
        super();
        this.state = {};
        this.parent = null;
        this.id = id ? id : null;
        this.props = props;
        this.addChild(...children);
    }

    /**
     * Adds a child node.
     * @param {Node[]} nodes
     */
    public addChild(...nodes: Node[]) {
        nodes.forEach(node => {
            if (node.parent !== this) {
                node.parent?.removeChild(node);
                node.parent = this;
                this.children.push(node);
                this.dispatchEvent(Node.mountEvent);
            }
        });
    }

    /**
     * Removes a child node.
     * @param {Node} node
     */
    public removeChild(node: Node) {
        this.children.filter(child => {
            if (child === node) {
                this.dispatchEvent(Node.dismountEvent, )
            }
            return child != node;
        });
    }

    getNodeById(id : string) : Node {
        return <Node>this.children.find(child => {
            return child.id === id ? child : child.getNodeById(id);
        });
    }

    /**
     * The first child of the Node.
     * @property {Node|null} firstChild
     */
    public get firstChild() : Node|null {
        return this.children.length > 0 ? this.children[0] : null;
    }

    /**
     * The last child of the Node.
     * @property {Node|null} lastChild
     */
    public get lastChild() : Node|null {
        return this.children.length > 0 ? this.children[this.children.length - 1] : null;
    }

    public get hasChildren() : boolean {
        return this.children.length > 0;
    }

    public get isRoot() :boolean {
        return this.parent === null;
    }

    public setState(newState: object) {
        this.state = {
            ...this.state,
            ...newState
        };
        this.dispatchEvent(Node.stateChangeEvent);
    }
}