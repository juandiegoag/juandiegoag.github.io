class Router {
    constructor(routes, entryNode) {
        this.routes = routes;
        this.entryNode = entryNode;
        this.init();
    }

    init() {
        if (this.entryNode && this.routes.length > 0) {
            window.addEventListener('hashchange', e => this.routeChange(e));
            this.routeChange();
        }
    }

    routeChange(event) {
        let routeToResolve = null;
        if (window.location.hash.length > 0) {
            const hash = window.location.hash.substr(1);
            routeToResolve = this.routes.find(e => e.isActive(hash));
        } else {
            routeToResolve = this.routes.find(e => e.isDefault);
        }

        if (routeToResolve) {
            if (event && event.oldURL) {
                const oldRouteName = event.oldURL.split('#')[1] || this.routes.find(e => e.isDefault).name;
                const oldRouteNode = this.routes.find(e => e.name === oldRouteName);
                oldRouteNode && oldRouteNode.toggleSelected(false);
            }
            routeToResolve.toggleSelected(true);
            routeToResolve.resolve().then(content => {
                this.entryNode.innerHTML = content;
            });
        }
    }
}

class Route {

    constructor(location, name, isDefault, anchorId, anchorLogoId) {
        this.location = location;
        this.name = name;
        this.isDefault = isDefault || false;
        this.content = null;
        this.anchorId = anchorId || (this.name + '_Anchor');
        this.anchorEl = document.getElementById(this.anchorId);
        this.anchorLogoId = anchorLogoId || (this.name + '_Logo');
        this.anchorLogo = document.getElementById(this.anchorLogoId);
        this.selectedClass = 'sri-nav__menu-option--selected';
        this.selectedLogoClass = 'sri-nav__logo--selected';
    }

    isActive(hash) {
        return hash.replace('#', '') === this.name;
    }

    toggleSelected(select) {
        if (this.anchorEl && this.anchorLogo) {
            if (select) {
                this.anchorEl.classList.add(this.selectedClass || '');
                this.anchorLogo.classList.add(this.selectedLogoClass || '');
            } else {
                this.anchorEl.classList.remove(this.selectedClass || '');
                this.anchorLogo.classList.remove(this.selectedLogoClass || '');
            }
        }
    }

    resolve() {
        const self = this;
        return new Promise( (resolve, reject) => {
            if (!self.content) {
                fetch(self.location)
                    .then(response => {
                        response.text()
                            .then(content => {
                                self.content = content;
                                resolve(content);
                            })
                            .catch(err => reject(err));
                    })
                    .catch(err => reject(err));
            } else {
                resolve(self.content);
            }

        });
        
    }
}

new Router([
    new Route('dist/views/yahoo.html', 'Yahoo', true), 
    new Route('dist/views/bing.html', 'Bing'),
    new Route('dist/views/comparison.html', 'Comparison'),
    new Route('dist/views/members.html', 'Members', false, null, 'Yahoo_Logo'),
], document.getElementById('app'));
