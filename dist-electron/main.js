import __farmNodeModule from 'node:module';globalThis.nodeRequire = __farmNodeModule.createRequire(import.meta.url);(globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'] = {__FARM_TARGET_ENV__: 'node'};function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}function _export_star(from, to) {
    Object.keys(from).forEach(function(k) {
        if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
            Object.defineProperty(to, k, {
                enumerable: true,
                get: function() {
                    return from[k];
                }
            });
        }
    });
    return from;
}function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
        }
    }
    newObj.default = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}const __global_this__ = typeof globalThis !== 'undefined' ? globalThis : window;
var index_ts_default = {
    name: 'farm-runtime-import-meta',
    _moduleSystem: {},
    bootstrap (system) {
        this._moduleSystem = system;
    },
    moduleCreated (module) {
        const publicPath = this._moduleSystem.publicPaths?.[0] || "";
        const isSSR = this._moduleSystem.targetEnv === "node";
        const { location } = __global_this__;
        let baseUrl;
        try {
            baseUrl = (location ? new URL(publicPath, `${location.protocol}//${location.host}`) : new URL(module.resource_pot)).pathname;
        } catch (_) {
            baseUrl = '/';
        }
        module.meta.env = {
            ...{
                "FARM_DEV_SERVER_URL": "http://localhost:9000",
                "NODE_ENV": "production",
                "mode": "production"
            } ?? {},
            dev: process.env.NODE_ENV === 'development',
            prod: process.env.NODE_ENV === 'production',
            BASE_URL: baseUrl,
            SSR: isSSR
        };
        const url = location ? `${location.protocol}//${location.host}${publicPath.replace(/\/$/, '')}/${module.id}?t=${Date.now()}` : module.resource_pot;
        module.meta.url = url;
    }
};

class Module {
    id;
    exports;
    resource_pot;
    meta;
    require;
    constructor(id, require){
        this.id = id;
        this.exports = {};
        this.meta = {
            env: {}
        };
        this.require = require;
    }
    o(to, to_k, get) {
        Object.defineProperty(to, to_k, {
            enumerable: true,
            get
        });
    }
    d(to, to_k, val) {
        this.o(to, to_k, function() {
            return val;
        });
    }
    _m(to) {
        const key = '__esModule';
        if (to[key]) return;
        Object.defineProperty(to, key, {
            value: true
        });
    }
    _e(to, from) {
        const self = this;
        Object.keys(from).forEach(function(k) {
            if (k !== "default" && !Object.prototype.hasOwnProperty.call(to, k)) {
                self.d(to, k, from[k]);
            }
        });
        return from;
    }
    i(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    _g(nodeInterop) {
        if (typeof WeakMap !== "function") return null;
        var cacheBabelInterop = new WeakMap();
        var cacheNodeInterop = new WeakMap();
        return (this._g = function(nodeInterop) {
            return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
    }
    w(obj, nodeInterop) {
        if (!nodeInterop && obj && obj.__esModule) return obj;
        if (obj === null || typeof obj !== "object" && typeof obj !== "function") return {
            default: obj
        };
        var cache = this._g(nodeInterop);
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = {
            __proto__: null
        };
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for(var key$1 in obj){
            if (key$1 !== "default" && Object.prototype.hasOwnProperty.call(obj, key$1)) {
                var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key$1) : null;
                if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key$1, desc);
                else newObj[key$1] = obj[key$1];
            }
        }
        newObj.default = obj;
        if (cache) cache.set(obj, newObj);
        return newObj;
    }
    _(to, to_k, from, from_k) {
        this.d(to, to_k, from[from_k || to_k]);
    }
    p(to, val) {
        for (const key$2 of Object.keys(val)){
            const newKey = to[key$2];
            if (newKey && !Object.prototype.hasOwnProperty.call(val, newKey)) {
                this.d(val, newKey, val[key$2]);
            }
        }
    }
    f(v) {
        return v.default;
    }
}

class FarmRuntimePluginContainer {
    plugins = [];
    constructor(plugins){
        this.plugins = plugins;
    }
    hookSerial(hookName, ...args) {
        for (const plugin of this.plugins){
            const hook = plugin[hookName];
            if (hook) {
                hook.apply(plugin, args);
            }
        }
    }
    hookBail(hookName, ...args) {
        for (const plugin$1 of this.plugins){
            const hook$1 = plugin$1[hookName];
            if (hook$1) {
                const result = hook$1.apply(plugin$1, args);
                if (result) {
                    return result;
                }
            }
        }
    }
}

const __farm_global_this__ = (globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'];
const targetEnv = __farm_global_this__.__FARM_TARGET_ENV__ || 'node';
const isBrowser = targetEnv === 'browser' && (globalThis || window).document;
class ResourceLoader {
    moduleSystem;
    _loadedResources;
    _loadingResources;
    publicPaths;
    constructor(moduleSystem, publicPaths){
        this.moduleSystem = moduleSystem;
        this._loadedResources = {};
        this._loadingResources = {};
        this.publicPaths = publicPaths;
    }
    load(resource, index = 0) {
        if (!isBrowser) {
            const result$1 = this.moduleSystem.pluginContainer.hookBail('loadResource', resource);
            if (result$1) {
                return result$1.then((res)=>{
                    if (!res.success && res.retryWithDefaultResourceLoader) {
                        if (resource.type === 'script') {
                            return this._loadScript(`./${resource.path}`);
                        } else if (resource.type === 'link') {
                            return this._loadLink(`./${resource.path}`);
                        }
                    } else if (!res.success) {
                        throw new Error(`[Farm] Failed to load resource: "${resource.path}, type: ${resource.type}". Original Error: ${res.err}`);
                    }
                });
            } else {
                if (resource.type === 'script') {
                    return this._loadScript(`./${resource.path}`);
                } else if (resource.type === 'link') {
                    return this._loadLink(`./${resource.path}`);
                }
            }
        }
        const publicPath = this.publicPaths[index];
        const url = `${publicPath.endsWith('/') ? publicPath.slice(0, -1) : publicPath}/${resource.path}`;
        if (this._loadedResources[resource.path]) {
            return;
        } else if (this._loadingResources[resource.path]) {
            return this._loadingResources[resource.path];
        }
        const result$2 = this.moduleSystem.pluginContainer.hookBail('loadResource', resource);
        if (result$2) {
            return result$2.then((res)=>{
                if (res.success) {
                    this.setLoadedResource(resource.path);
                } else if (res.retryWithDefaultResourceLoader) {
                    return this._load(url, resource, index);
                } else {
                    throw new Error(`[Farm] Failed to load resource: "${resource.path}, type: ${resource.type}". Original Error: ${res.err}`);
                }
            });
        } else {
            return this._load(url, resource, index);
        }
    }
    setLoadedResource(path, loaded = true) {
        this._loadedResources[path] = loaded;
    }
    isResourceLoaded(path) {
        return this._loadedResources[path];
    }
    _load(url, resource, index) {
        let promise = Promise.resolve();
        if (resource.type === 'script') {
            promise = this._loadScript(url);
        } else if (resource.type === 'link') {
            promise = this._loadLink(url);
        }
        this._loadingResources[resource.path] = promise;
        promise.then(()=>{
            this._loadedResources[resource.path] = true;
            this._loadingResources[resource.path] = null;
        }).catch((e)=>{
            console.warn(`[Farm] Failed to load resource "${url}" using publicPath: ${this.publicPaths[index]}`);
            index++;
            if (index < this.publicPaths.length) {
                return this._load(url, resource, index);
            } else {
                this._loadingResources[resource.path] = null;
                throw new Error(`[Farm] Failed to load resource: "${resource.path}, type: ${resource.type}". ${e}`);
            }
        });
        return promise;
    }
    _loadScript(path) {
        if (!isBrowser) {
            return import(path);
        } else {
            return new Promise((resolve, reject)=>{
                const script = document.createElement('script');
                script.src = path;
                document.body.appendChild(script);
                script.onload = ()=>{
                    resolve();
                };
                script.onerror = (e)=>{
                    reject(e);
                };
            });
        }
    }
    _loadLink(path) {
        if (!isBrowser) {
            return Promise.resolve();
        } else {
            return new Promise((resolve, reject)=>{
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = path;
                document.head.appendChild(link);
                link.onload = ()=>{
                    resolve();
                };
                link.onerror = (e)=>{
                    reject(e);
                };
            });
        }
    }
}

class ModuleSystem {
    modules;
    cache;
    externalModules;
    reRegisterModules;
    publicPaths;
    dynamicModuleResourcesMap;
    resourceLoader;
    pluginContainer;
    targetEnv;
    constructor(){
        this.modules = {};
        this.cache = {};
        this.publicPaths = [];
        this.dynamicModuleResourcesMap = {};
        this.resourceLoader = new ResourceLoader(this, this.publicPaths);
        this.pluginContainer = new FarmRuntimePluginContainer([]);
        this.targetEnv = targetEnv;
        this.externalModules = {};
        this.reRegisterModules = false;
    }
    require(moduleId, isCJS = false) {
        if (this.cache[moduleId]) {
            const shouldSkip = this.pluginContainer.hookBail("readModuleCache", this.cache[moduleId]);
            if (!shouldSkip) {
                return this.cache[moduleId].exports;
            }
        }
        const initializer = this.modules[moduleId];
        if (!initializer) {
            if (this.externalModules[moduleId]) {
                const exports = this.externalModules[moduleId];
                if (isCJS) {
                    return exports.default || exports;
                }
                return exports;
            }
            if ((this.targetEnv === "node" || !isBrowser) && nodeRequire) {
                const externalModule = nodeRequire(moduleId);
                return externalModule;
            }
            this.pluginContainer.hookSerial("moduleNotFound", moduleId);
            console.debug(`[Farm] Module "${moduleId}" is not registered`);
            return {};
        }
        const module = new Module(moduleId, this.require.bind(this));
        module.resource_pot = initializer.__farm_resource_pot__;
        this.pluginContainer.hookSerial("moduleCreated", module);
        this.cache[moduleId] = module;
        if (!(globalThis || global || window || {}).require) {
            (globalThis || global || window || {
                require: undefined
            }).require = this.require.bind(this);
        }
        const result$3 = initializer(module, module.exports, this.require.bind(this), this.farmDynamicRequire.bind(this));
        if (result$3 && result$3 instanceof Promise) {
            return result$3.then(()=>{
                this.pluginContainer.hookSerial("moduleInitialized", module);
                return module.exports;
            });
        } else {
            this.pluginContainer.hookSerial("moduleInitialized", module);
            return module.exports;
        }
    }
    farmDynamicRequire(moduleId) {
        if (this.modules[moduleId]) {
            const exports$1 = this.require(moduleId);
            if (exports$1.__farm_async) {
                return exports$1.default;
            } else {
                return Promise.resolve(exports$1);
            }
        }
        return this.loadDynamicResources(moduleId);
    }
    loadDynamicResources(moduleId, force = false) {
        const resources = this.dynamicModuleResourcesMap[moduleId];
        if (!resources || resources.length === 0) {
            throw new Error(`Dynamic imported module "${moduleId}" does not belong to any resource`);
        }
        if (force) {
            this.reRegisterModules = true;
            this.clearCache(moduleId);
        }
        return Promise.all(resources.map((resource)=>{
            if (force) {
                this.resourceLoader.setLoadedResource(resource.path, false);
            }
            return this.resourceLoader.load(resource);
        })).then(()=>{
            if (!this.modules[moduleId]) {
                throw new Error(`Dynamic imported module "${moduleId}" is not registered.`);
            }
            this.reRegisterModules = false;
            const result$4 = this.require(moduleId);
            if (result$4.__farm_async) {
                return result$4.default;
            } else {
                return result$4;
            }
        }).catch((err)=>{
            console.error(`[Farm] Error loading dynamic module "${moduleId}"`, err);
            throw err;
        });
    }
    register(moduleId, initializer) {
        if (this.modules[moduleId] && !this.reRegisterModules) {
            console.warn(`Module "${moduleId}" has registered! It should not be registered twice`);
            return;
        }
        this.modules[moduleId] = initializer;
    }
    update(moduleId, init) {
        this.modules[moduleId] = init;
        this.clearCache(moduleId);
    }
    delete(moduleId) {
        if (this.modules[moduleId]) {
            this.clearCache(moduleId);
            delete this.modules[moduleId];
            return true;
        } else {
            return false;
        }
    }
    getModuleUrl(moduleId) {
        const publicPath$1 = this.publicPaths[0] ?? "";
        if (isBrowser) {
            const url$1 = `${window.location.protocol}//${window.location.host}${publicPath$1.endsWith("/") ? publicPath$1.slice(0, -1) : publicPath$1}/${this.modules[moduleId].__farm_resource_pot__}`;
            return url$1;
        } else {
            return this.modules[moduleId].__farm_resource_pot__;
        }
    }
    getCache(moduleId) {
        return this.cache[moduleId];
    }
    clearCache(moduleId) {
        if (this.cache[moduleId]) {
            delete this.cache[moduleId];
            return true;
        } else {
            return false;
        }
    }
    setInitialLoadedResources(resources) {
        for (const resource of resources){
            this.resourceLoader.setLoadedResource(resource);
        }
    }
    setDynamicModuleResourcesMap(dynamicModuleResourcesMap) {
        this.dynamicModuleResourcesMap = dynamicModuleResourcesMap;
    }
    setPublicPaths(publicPaths) {
        this.publicPaths = publicPaths;
        this.resourceLoader.publicPaths = this.publicPaths;
    }
    setPlugins(plugins) {
        this.pluginContainer.plugins = plugins;
    }
    addPlugin(plugin) {
        if (this.pluginContainer.plugins.every((p)=>p.name !== plugin.name)) {
            this.pluginContainer.plugins.push(plugin);
        }
    }
    removePlugin(pluginName) {
        this.pluginContainer.plugins = this.pluginContainer.plugins.filter((p)=>p.name !== pluginName);
    }
    setExternalModules(externalModules) {
        Object.assign(this.externalModules, externalModules || {});
    }
    bootstrap() {
        this.pluginContainer.hookSerial("bootstrap", this);
    }
}

__farm_global_this__.__farm_module_system__ = (function() {
    const moduleSystem = new ModuleSystem();
    return function() {
        return moduleSystem;
    };
})()();
(globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'].__farm_module_system__.setPlugins([
    index_ts_default
]);
import * as __farm_external_module_electron from "electron";import * as __farm_external_module_node_path from "node:path";import * as __farm_external_module_node_url from "node:url";(globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'].__farm_module_system__.setExternalModules({"electron": __farm_external_module_electron && __farm_external_module_electron.default && !__farm_external_module_electron.__esModule ? {...__farm_external_module_electron,__esModule:true} : {...__farm_external_module_electron},"node:path": __farm_external_module_node_path && __farm_external_module_node_path.default && !__farm_external_module_node_path.__esModule ? {...__farm_external_module_node_path,__esModule:true} : {...__farm_external_module_node_path},"node:url": __farm_external_module_node_url && __farm_external_module_node_url.default && !__farm_external_module_node_url.__esModule ? {...__farm_external_module_node_url,__esModule:true} : {...__farm_external_module_node_url}});(function(_){for(var r in _){_[r].__farm_resource_pot__='main_13ee.js';(globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'].__farm_module_system__.register(r,_[r])}})({"1258282f":function  (module, exports, farmRequire, farmDynamicRequire) {
    module._m(exports);
    var _f_node_path = module.i(farmRequire('node:path'));
    var _f_node_url = farmRequire('node:url');
    var _f_electron = farmRequire('electron');
    const __dirname = module.f(_f_node_path).dirname(_f_node_url.fileURLToPath(import.meta.url));
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
    process.env.DIST = module.f(_f_node_path).join(__dirname, '../dist');
    process.env.FARM_PUBLIC = _f_electron.app.isPackaged ? process.env.DIST : module.f(_f_node_path).join(process.env.DIST, '../public');
    if (!_f_electron.app.requestSingleInstanceLock()) {
        _f_electron.app.quit();
        process.exit(0);
    }
    let win;
    function createWindow() {
        win = new _f_electron.BrowserWindow({
            icon: module.f(_f_node_path).join(process.env.FARM_PUBLIC, 'logo.svg'),
            webPreferences: {
                preload: module.f(_f_node_path).join(__dirname, './preload.mjs')
            }
        });
        win.webContents.on('did-finish-load', ()=>{
            win?.webContents.send('main-process-message', (new Date).toLocaleString());
        });
        if (process.env.FARM_DEV_SERVER_URL) {
            win.loadURL(process.env.FARM_DEV_SERVER_URL);
            win.webContents.openDevTools();
        } else {
            win.loadFile(module.f(_f_node_path).join(process.env.DIST, 'index.html'));
        }
    }
    _f_electron.app.on('window-all-closed', ()=>{
        _f_electron.app.quit();
        win = null;
    });
    _f_electron.app.whenReady().then(createWindow);
}
,});(globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'].__farm_module_system__.setInitialLoadedResources([]);(globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'].__farm_module_system__.setDynamicModuleResourcesMap({  });var farmModuleSystem = (globalThis || window || global)['55680ffc81bc862e132f86b47e33d6e6'].__farm_module_system__;farmModuleSystem.bootstrap();var entry = farmModuleSystem.require("1258282f");
//# sourceMappingURL=main.js.map