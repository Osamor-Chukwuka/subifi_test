import {
  require_react
} from "./chunk-BM6B6MNN.js";
import {
  __commonJS
} from "./chunk-UV5CTPV7.js";

// node_modules/react-table/dist/react-table.development.js
var require_react_table_development = __commonJS({
  "node_modules/react-table/dist/react-table.development.js"(exports, module) {
    (function(global, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports, require_react()) : typeof define === "function" && define.amd ? define(["exports", "react"], factory) : (global = global || self, factory(global.ReactTable = {}, global.React));
    })(exports, function(exports2, React) {
      "use strict";
      React = React && Object.prototype.hasOwnProperty.call(React, "default") ? React["default"] : React;
      function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }
        if (info.done) {
          resolve(value);
        } else {
          Promise.resolve(value).then(_next, _throw);
        }
      }
      function _asyncToGenerator(fn) {
        return function() {
          var self2 = this, args = arguments;
          return new Promise(function(resolve, reject) {
            var gen = fn.apply(self2, args);
            function _next(value) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
              asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(void 0);
          });
        };
      }
      function _extends() {
        _extends = Object.assign || function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        return _extends.apply(this, arguments);
      }
      function _objectWithoutPropertiesLoose(source, excluded) {
        if (source == null)
          return {};
        var target = {};
        var sourceKeys = Object.keys(source);
        var key, i;
        for (i = 0; i < sourceKeys.length; i++) {
          key = sourceKeys[i];
          if (excluded.indexOf(key) >= 0)
            continue;
          target[key] = source[key];
        }
        return target;
      }
      function _toPrimitive(input, hint) {
        if (typeof input !== "object" || input === null)
          return input;
        var prim = input[Symbol.toPrimitive];
        if (prim !== void 0) {
          var res = prim.call(input, hint || "default");
          if (typeof res !== "object")
            return res;
          throw new TypeError("@@toPrimitive must return a primitive value.");
        }
        return (hint === "string" ? String : Number)(input);
      }
      function _toPropertyKey(arg) {
        var key = _toPrimitive(arg, "string");
        return typeof key === "symbol" ? key : String(key);
      }
      var renderErr = "Renderer Error ☝️";
      var actions = {
        init: "init"
      };
      var defaultRenderer = function defaultRenderer2(_ref) {
        var _ref$value = _ref.value, value = _ref$value === void 0 ? "" : _ref$value;
        return value;
      };
      var emptyRenderer = function emptyRenderer2() {
        return React.createElement(React.Fragment, null, " ");
      };
      var defaultColumn = {
        Cell: defaultRenderer,
        width: 150,
        minWidth: 0,
        maxWidth: Number.MAX_SAFE_INTEGER
      };
      function mergeProps() {
        for (var _len = arguments.length, propList = new Array(_len), _key = 0; _key < _len; _key++) {
          propList[_key] = arguments[_key];
        }
        return propList.reduce(function(props, next) {
          var style = next.style, className = next.className, rest = _objectWithoutPropertiesLoose(next, ["style", "className"]);
          props = _extends({}, props, {}, rest);
          if (style) {
            props.style = props.style ? _extends({}, props.style || {}, {}, style || {}) : style;
          }
          if (className) {
            props.className = props.className ? props.className + " " + className : className;
          }
          if (props.className === "") {
            delete props.className;
          }
          return props;
        }, {});
      }
      function handlePropGetter(prevProps, userProps, meta) {
        if (typeof userProps === "function") {
          return handlePropGetter({}, userProps(prevProps, meta));
        }
        if (Array.isArray(userProps)) {
          return mergeProps.apply(void 0, [prevProps].concat(userProps));
        }
        return mergeProps(prevProps, userProps);
      }
      var makePropGetter = function makePropGetter2(hooks, meta) {
        if (meta === void 0) {
          meta = {};
        }
        return function(userProps) {
          if (userProps === void 0) {
            userProps = {};
          }
          return [].concat(hooks, [userProps]).reduce(function(prev, next) {
            return handlePropGetter(prev, next, _extends({}, meta, {
              userProps
            }));
          }, {});
        };
      };
      var reduceHooks = function reduceHooks2(hooks, initial, meta, allowUndefined) {
        if (meta === void 0) {
          meta = {};
        }
        return hooks.reduce(function(prev, next) {
          var nextValue = next(prev, meta);
          {
            if (!allowUndefined && typeof nextValue === "undefined") {
              console.info(next);
              throw new Error("React Table: A reducer hook ☝️ just returned undefined! This is not allowed.");
            }
          }
          return nextValue;
        }, initial);
      };
      var loopHooks = function loopHooks2(hooks, context, meta) {
        if (meta === void 0) {
          meta = {};
        }
        return hooks.forEach(function(hook) {
          var nextValue = hook(context, meta);
          {
            if (typeof nextValue !== "undefined") {
              console.info(hook, nextValue);
              throw new Error("React Table: A loop-type hook ☝️ just returned a value! This is not allowed.");
            }
          }
        });
      };
      function ensurePluginOrder(plugins, befores, pluginName2, afters) {
        if (afters) {
          throw new Error('Defining plugins in the "after" section of ensurePluginOrder is no longer supported (see plugin ' + pluginName2 + ")");
        }
        var pluginIndex = plugins.findIndex(function(plugin) {
          return plugin.pluginName === pluginName2;
        });
        if (pluginIndex === -1) {
          {
            throw new Error('The plugin "' + pluginName2 + `" was not found in the plugin list!
This usually means you need to need to name your plugin hook by setting the 'pluginName' property of the hook function, eg:

  ` + pluginName2 + ".pluginName = '" + pluginName2 + "'\n");
          }
        }
        befores.forEach(function(before) {
          var beforeIndex = plugins.findIndex(function(plugin) {
            return plugin.pluginName === before;
          });
          if (beforeIndex > -1 && beforeIndex > pluginIndex) {
            {
              throw new Error("React Table: The " + pluginName2 + " plugin hook must be placed after the " + before + " plugin hook!");
            }
          }
        });
      }
      function functionalUpdate(updater, old) {
        return typeof updater === "function" ? updater(old) : updater;
      }
      function useGetLatest(obj) {
        var ref = React.useRef();
        ref.current = obj;
        return React.useCallback(function() {
          return ref.current;
        }, []);
      }
      var safeUseLayoutEffect = typeof document !== "undefined" ? React.useLayoutEffect : React.useEffect;
      function useMountedLayoutEffect(fn, deps) {
        var mountedRef = React.useRef(false);
        safeUseLayoutEffect(function() {
          if (mountedRef.current) {
            fn();
          }
          mountedRef.current = true;
        }, deps);
      }
      function useAsyncDebounce(defaultFn, defaultWait) {
        if (defaultWait === void 0) {
          defaultWait = 0;
        }
        var debounceRef = React.useRef({});
        var getDefaultFn = useGetLatest(defaultFn);
        var getDefaultWait = useGetLatest(defaultWait);
        return React.useCallback(
          function() {
            var _ref2 = _asyncToGenerator(
              regeneratorRuntime.mark(function _callee2() {
                var _len2, args, _key2, _args2 = arguments;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        for (_len2 = _args2.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                          args[_key2] = _args2[_key2];
                        }
                        if (!debounceRef.current.promise) {
                          debounceRef.current.promise = new Promise(function(resolve, reject) {
                            debounceRef.current.resolve = resolve;
                            debounceRef.current.reject = reject;
                          });
                        }
                        if (debounceRef.current.timeout) {
                          clearTimeout(debounceRef.current.timeout);
                        }
                        debounceRef.current.timeout = setTimeout(
                          _asyncToGenerator(
                            regeneratorRuntime.mark(function _callee() {
                              return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                  switch (_context.prev = _context.next) {
                                    case 0:
                                      delete debounceRef.current.timeout;
                                      _context.prev = 1;
                                      _context.t0 = debounceRef.current;
                                      _context.next = 5;
                                      return getDefaultFn().apply(void 0, args);
                                    case 5:
                                      _context.t1 = _context.sent;
                                      _context.t0.resolve.call(_context.t0, _context.t1);
                                      _context.next = 12;
                                      break;
                                    case 9:
                                      _context.prev = 9;
                                      _context.t2 = _context["catch"](1);
                                      debounceRef.current.reject(_context.t2);
                                    case 12:
                                      _context.prev = 12;
                                      delete debounceRef.current.promise;
                                      return _context.finish(12);
                                    case 15:
                                    case "end":
                                      return _context.stop();
                                  }
                                }
                              }, _callee, null, [[1, 9, 12, 15]]);
                            })
                          ),
                          getDefaultWait()
                        );
                        return _context2.abrupt("return", debounceRef.current.promise);
                      case 5:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              })
            );
            return function() {
              return _ref2.apply(this, arguments);
            };
          }(),
          [getDefaultFn, getDefaultWait]
        );
      }
      function makeRenderer(instance, column, meta) {
        if (meta === void 0) {
          meta = {};
        }
        return function(type, userProps) {
          if (userProps === void 0) {
            userProps = {};
          }
          var Comp = typeof type === "string" ? column[type] : type;
          if (typeof Comp === "undefined") {
            console.info(column);
            throw new Error(renderErr);
          }
          return flexRender(Comp, _extends({}, instance, {
            column
          }, meta, {}, userProps));
        };
      }
      function flexRender(Comp, props) {
        return isReactComponent(Comp) ? React.createElement(Comp, props) : Comp;
      }
      function isReactComponent(component) {
        return isClassComponent(component) || typeof component === "function" || isExoticComponent(component);
      }
      function isClassComponent(component) {
        return typeof component === "function" && function() {
          var proto = Object.getPrototypeOf(component);
          return proto.prototype && proto.prototype.isReactComponent;
        }();
      }
      function isExoticComponent(component) {
        return typeof component === "object" && typeof component.$$typeof === "symbol" && ["react.memo", "react.forward_ref"].includes(component.$$typeof.description);
      }
      function linkColumnStructure(columns, parent, depth) {
        if (depth === void 0) {
          depth = 0;
        }
        return columns.map(function(column) {
          column = _extends({}, column, {
            parent,
            depth
          });
          assignColumnAccessor(column);
          if (column.columns) {
            column.columns = linkColumnStructure(column.columns, column, depth + 1);
          }
          return column;
        });
      }
      function flattenColumns(columns) {
        return flattenBy(columns, "columns");
      }
      function assignColumnAccessor(column) {
        var id = column.id, accessor = column.accessor, Header = column.Header;
        if (typeof accessor === "string") {
          id = id || accessor;
          var accessorPath = accessor.split(".");
          accessor = function accessor2(row) {
            return getBy(row, accessorPath);
          };
        }
        if (!id && typeof Header === "string" && Header) {
          id = Header;
        }
        if (!id && column.columns) {
          console.error(column);
          throw new Error('A column ID (or unique "Header" value) is required!');
        }
        if (!id) {
          console.error(column);
          throw new Error("A column ID (or string accessor) is required!");
        }
        Object.assign(column, {
          id,
          accessor
        });
        return column;
      }
      function decorateColumn(column, userDefaultColumn) {
        if (!userDefaultColumn) {
          throw new Error();
        }
        Object.assign(column, _extends({
          // Make sure there is a fallback header, just in case
          Header: emptyRenderer,
          Footer: emptyRenderer
        }, defaultColumn, {}, userDefaultColumn, {}, column));
        Object.assign(column, {
          originalWidth: column.width
        });
        return column;
      }
      function makeHeaderGroups(allColumns2, defaultColumn2, additionalHeaderProperties) {
        if (additionalHeaderProperties === void 0) {
          additionalHeaderProperties = function additionalHeaderProperties2() {
            return {};
          };
        }
        var headerGroups = [];
        var scanColumns = allColumns2;
        var uid = 0;
        var getUID = function getUID2() {
          return uid++;
        };
        var _loop = function _loop2() {
          var headerGroup = {
            headers: []
          };
          var parentColumns = [];
          var hasParents = scanColumns.some(function(d) {
            return d.parent;
          });
          scanColumns.forEach(function(column) {
            var latestParentColumn = [].concat(parentColumns).reverse()[0];
            var newParent;
            if (hasParents) {
              if (column.parent) {
                newParent = _extends({}, column.parent, {
                  originalId: column.parent.id,
                  id: column.parent.id + "_" + getUID(),
                  headers: [column]
                }, additionalHeaderProperties(column));
              } else {
                var originalId = column.id + "_placeholder";
                newParent = decorateColumn(_extends({
                  originalId,
                  id: column.id + "_placeholder_" + getUID(),
                  placeholderOf: column,
                  headers: [column]
                }, additionalHeaderProperties(column)), defaultColumn2);
              }
              if (latestParentColumn && latestParentColumn.originalId === newParent.originalId) {
                latestParentColumn.headers.push(column);
              } else {
                parentColumns.push(newParent);
              }
            }
            headerGroup.headers.push(column);
          });
          headerGroups.push(headerGroup);
          scanColumns = parentColumns;
        };
        while (scanColumns.length) {
          _loop();
        }
        return headerGroups.reverse();
      }
      var pathObjCache = /* @__PURE__ */ new Map();
      function getBy(obj, path, def) {
        if (!path) {
          return obj;
        }
        var cacheKey = typeof path === "function" ? path : JSON.stringify(path);
        var pathObj = pathObjCache.get(cacheKey) || function() {
          var pathObj2 = makePathArray(path);
          pathObjCache.set(cacheKey, pathObj2);
          return pathObj2;
        }();
        var val;
        try {
          val = pathObj.reduce(function(cursor, pathPart) {
            return cursor[pathPart];
          }, obj);
        } catch (e) {
        }
        return typeof val !== "undefined" ? val : def;
      }
      function getFirstDefined() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        for (var i = 0; i < args.length; i += 1) {
          if (typeof args[i] !== "undefined") {
            return args[i];
          }
        }
      }
      function isFunction(a) {
        if (typeof a === "function") {
          return a;
        }
      }
      function flattenBy(arr, key) {
        var flat = [];
        var recurse = function recurse2(arr2) {
          arr2.forEach(function(d) {
            if (!d[key]) {
              flat.push(d);
            } else {
              recurse2(d[key]);
            }
          });
        };
        recurse(arr);
        return flat;
      }
      function expandRows(rows, _ref) {
        var manualExpandedKey = _ref.manualExpandedKey, expanded = _ref.expanded, _ref$expandSubRows = _ref.expandSubRows, expandSubRows = _ref$expandSubRows === void 0 ? true : _ref$expandSubRows;
        var expandedRows = [];
        var handleRow = function handleRow2(row, addToExpandedRows) {
          if (addToExpandedRows === void 0) {
            addToExpandedRows = true;
          }
          row.isExpanded = row.original && row.original[manualExpandedKey] || expanded[row.id];
          row.canExpand = row.subRows && !!row.subRows.length;
          if (addToExpandedRows) {
            expandedRows.push(row);
          }
          if (row.subRows && row.subRows.length && row.isExpanded) {
            row.subRows.forEach(function(row2) {
              return handleRow2(row2, expandSubRows);
            });
          }
        };
        rows.forEach(function(row) {
          return handleRow(row);
        });
        return expandedRows;
      }
      function getFilterMethod(filter, userFilterTypes, filterTypes2) {
        return isFunction(filter) || userFilterTypes[filter] || filterTypes2[filter] || filterTypes2.text;
      }
      function shouldAutoRemoveFilter(autoRemove, value, column) {
        return autoRemove ? autoRemove(value, column) : typeof value === "undefined";
      }
      function unpreparedAccessWarning() {
        throw new Error("React-Table: You have not called prepareRow(row) one or more rows you are attempting to render.");
      }
      var passiveSupported = null;
      function passiveEventSupported() {
        if (typeof passiveSupported === "boolean")
          return passiveSupported;
        var supported = false;
        try {
          var options = {
            get passive() {
              supported = true;
              return false;
            }
          };
          window.addEventListener("test", null, options);
          window.removeEventListener("test", null, options);
        } catch (err) {
          supported = false;
        }
        passiveSupported = supported;
        return passiveSupported;
      }
      var reOpenBracket = /\[/g;
      var reCloseBracket = /\]/g;
      function makePathArray(obj) {
        return flattenDeep(obj).map(function(d) {
          return String(d).replace(".", "_");
        }).join(".").replace(reOpenBracket, ".").replace(reCloseBracket, "").split(".");
      }
      function flattenDeep(arr, newArr) {
        if (newArr === void 0) {
          newArr = [];
        }
        if (!Array.isArray(arr)) {
          newArr.push(arr);
        } else {
          for (var i = 0; i < arr.length; i += 1) {
            flattenDeep(arr[i], newArr);
          }
        }
        return newArr;
      }
      var defaultGetTableProps = function defaultGetTableProps2(props) {
        return _extends({
          role: "table"
        }, props);
      };
      var defaultGetTableBodyProps = function defaultGetTableBodyProps2(props) {
        return _extends({
          role: "rowgroup"
        }, props);
      };
      var defaultGetHeaderProps = function defaultGetHeaderProps2(props, _ref) {
        var column = _ref.column;
        return _extends({
          key: "header_" + column.id,
          colSpan: column.totalVisibleHeaderCount,
          role: "columnheader"
        }, props);
      };
      var defaultGetFooterProps = function defaultGetFooterProps2(props, _ref2) {
        var column = _ref2.column;
        return _extends({
          key: "footer_" + column.id,
          colSpan: column.totalVisibleHeaderCount
        }, props);
      };
      var defaultGetHeaderGroupProps = function defaultGetHeaderGroupProps2(props, _ref3) {
        var index = _ref3.index;
        return _extends({
          key: "headerGroup_" + index,
          role: "row"
        }, props);
      };
      var defaultGetFooterGroupProps = function defaultGetFooterGroupProps2(props, _ref4) {
        var index = _ref4.index;
        return _extends({
          key: "footerGroup_" + index
        }, props);
      };
      var defaultGetRowProps = function defaultGetRowProps2(props, _ref5) {
        var row = _ref5.row;
        return _extends({
          key: "row_" + row.id,
          role: "row"
        }, props);
      };
      var defaultGetCellProps = function defaultGetCellProps2(props, _ref6) {
        var cell = _ref6.cell;
        return _extends({
          key: "cell_" + cell.row.id + "_" + cell.column.id,
          role: "cell"
        }, props);
      };
      function makeDefaultPluginHooks() {
        return {
          useOptions: [],
          stateReducers: [],
          useControlledState: [],
          columns: [],
          columnsDeps: [],
          allColumns: [],
          allColumnsDeps: [],
          accessValue: [],
          materializedColumns: [],
          materializedColumnsDeps: [],
          useInstanceAfterData: [],
          visibleColumns: [],
          visibleColumnsDeps: [],
          headerGroups: [],
          headerGroupsDeps: [],
          useInstanceBeforeDimensions: [],
          useInstance: [],
          prepareRow: [],
          getTableProps: [defaultGetTableProps],
          getTableBodyProps: [defaultGetTableBodyProps],
          getHeaderGroupProps: [defaultGetHeaderGroupProps],
          getFooterGroupProps: [defaultGetFooterGroupProps],
          getHeaderProps: [defaultGetHeaderProps],
          getFooterProps: [defaultGetFooterProps],
          getRowProps: [defaultGetRowProps],
          getCellProps: [defaultGetCellProps],
          useFinalInstance: []
        };
      }
      actions.resetHiddenColumns = "resetHiddenColumns";
      actions.toggleHideColumn = "toggleHideColumn";
      actions.setHiddenColumns = "setHiddenColumns";
      actions.toggleHideAllColumns = "toggleHideAllColumns";
      var useColumnVisibility = function useColumnVisibility2(hooks) {
        hooks.getToggleHiddenProps = [defaultGetToggleHiddenProps];
        hooks.getToggleHideAllColumnsProps = [defaultGetToggleHideAllColumnsProps];
        hooks.stateReducers.push(reducer);
        hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions);
        hooks.headerGroupsDeps.push(function(deps, _ref) {
          var instance = _ref.instance;
          return [].concat(deps, [instance.state.hiddenColumns]);
        });
        hooks.useInstance.push(useInstance);
      };
      useColumnVisibility.pluginName = "useColumnVisibility";
      var defaultGetToggleHiddenProps = function defaultGetToggleHiddenProps2(props, _ref2) {
        var column = _ref2.column;
        return [props, {
          onChange: function onChange(e) {
            column.toggleHidden(!e.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: column.isVisible,
          title: "Toggle Column Visible"
        }];
      };
      var defaultGetToggleHideAllColumnsProps = function defaultGetToggleHideAllColumnsProps2(props, _ref3) {
        var instance = _ref3.instance;
        return [props, {
          onChange: function onChange(e) {
            instance.toggleHideAllColumns(!e.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: !instance.allColumnsHidden && !instance.state.hiddenColumns.length,
          title: "Toggle All Columns Hidden",
          indeterminate: !instance.allColumnsHidden && instance.state.hiddenColumns.length
        }];
      };
      function reducer(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            hiddenColumns: []
          }, state);
        }
        if (action.type === actions.resetHiddenColumns) {
          return _extends({}, state, {
            hiddenColumns: instance.initialState.hiddenColumns || []
          });
        }
        if (action.type === actions.toggleHideColumn) {
          var should = typeof action.value !== "undefined" ? action.value : !state.hiddenColumns.includes(action.columnId);
          var hiddenColumns = should ? [].concat(state.hiddenColumns, [action.columnId]) : state.hiddenColumns.filter(function(d) {
            return d !== action.columnId;
          });
          return _extends({}, state, {
            hiddenColumns
          });
        }
        if (action.type === actions.setHiddenColumns) {
          return _extends({}, state, {
            hiddenColumns: functionalUpdate(action.value, state.hiddenColumns)
          });
        }
        if (action.type === actions.toggleHideAllColumns) {
          var shouldAll = typeof action.value !== "undefined" ? action.value : !state.hiddenColumns.length;
          return _extends({}, state, {
            hiddenColumns: shouldAll ? instance.allColumns.map(function(d) {
              return d.id;
            }) : []
          });
        }
      }
      function useInstanceBeforeDimensions(instance) {
        var headers = instance.headers, hiddenColumns = instance.state.hiddenColumns;
        var isMountedRef = React.useRef(false);
        if (!isMountedRef.current)
          ;
        var handleColumn = function handleColumn2(column, parentVisible) {
          column.isVisible = parentVisible && !hiddenColumns.includes(column.id);
          var totalVisibleHeaderCount2 = 0;
          if (column.headers && column.headers.length) {
            column.headers.forEach(function(subColumn) {
              return totalVisibleHeaderCount2 += handleColumn2(subColumn, column.isVisible);
            });
          } else {
            totalVisibleHeaderCount2 = column.isVisible ? 1 : 0;
          }
          column.totalVisibleHeaderCount = totalVisibleHeaderCount2;
          return totalVisibleHeaderCount2;
        };
        var totalVisibleHeaderCount = 0;
        headers.forEach(function(subHeader) {
          return totalVisibleHeaderCount += handleColumn(subHeader, true);
        });
      }
      function useInstance(instance) {
        var columns = instance.columns, flatHeaders = instance.flatHeaders, dispatch = instance.dispatch, allColumns2 = instance.allColumns, getHooks = instance.getHooks, hiddenColumns = instance.state.hiddenColumns, _instance$autoResetHi = instance.autoResetHiddenColumns, autoResetHiddenColumns = _instance$autoResetHi === void 0 ? true : _instance$autoResetHi;
        var getInstance = useGetLatest(instance);
        var allColumnsHidden = allColumns2.length === hiddenColumns.length;
        var toggleHideColumn = React.useCallback(function(columnId, value) {
          return dispatch({
            type: actions.toggleHideColumn,
            columnId,
            value
          });
        }, [dispatch]);
        var setHiddenColumns = React.useCallback(function(value) {
          return dispatch({
            type: actions.setHiddenColumns,
            value
          });
        }, [dispatch]);
        var toggleHideAllColumns = React.useCallback(function(value) {
          return dispatch({
            type: actions.toggleHideAllColumns,
            value
          });
        }, [dispatch]);
        var getToggleHideAllColumnsProps = makePropGetter(getHooks().getToggleHideAllColumnsProps, {
          instance: getInstance()
        });
        flatHeaders.forEach(function(column) {
          column.toggleHidden = function(value) {
            dispatch({
              type: actions.toggleHideColumn,
              columnId: column.id,
              value
            });
          };
          column.getToggleHiddenProps = makePropGetter(getHooks().getToggleHiddenProps, {
            instance: getInstance(),
            column
          });
        });
        var getAutoResetHiddenColumns = useGetLatest(autoResetHiddenColumns);
        useMountedLayoutEffect(function() {
          if (getAutoResetHiddenColumns()) {
            dispatch({
              type: actions.resetHiddenColumns
            });
          }
        }, [dispatch, columns]);
        Object.assign(instance, {
          allColumnsHidden,
          toggleHideColumn,
          setHiddenColumns,
          toggleHideAllColumns,
          getToggleHideAllColumnsProps
        });
      }
      var defaultInitialState = {};
      var defaultColumnInstance = {};
      var defaultReducer = function defaultReducer2(state, action, prevState) {
        return state;
      };
      var defaultGetSubRows = function defaultGetSubRows2(row, index) {
        return row.subRows || [];
      };
      var defaultGetRowId = function defaultGetRowId2(row, index, parent) {
        return "" + (parent ? [parent.id, index].join(".") : index);
      };
      var defaultUseControlledState = function defaultUseControlledState2(d) {
        return d;
      };
      function applyDefaults(props) {
        var _props$initialState = props.initialState, initialState = _props$initialState === void 0 ? defaultInitialState : _props$initialState, _props$defaultColumn = props.defaultColumn, defaultColumn2 = _props$defaultColumn === void 0 ? defaultColumnInstance : _props$defaultColumn, _props$getSubRows = props.getSubRows, getSubRows = _props$getSubRows === void 0 ? defaultGetSubRows : _props$getSubRows, _props$getRowId = props.getRowId, getRowId = _props$getRowId === void 0 ? defaultGetRowId : _props$getRowId, _props$stateReducer = props.stateReducer, stateReducer = _props$stateReducer === void 0 ? defaultReducer : _props$stateReducer, _props$useControlledS = props.useControlledState, useControlledState = _props$useControlledS === void 0 ? defaultUseControlledState : _props$useControlledS, rest = _objectWithoutPropertiesLoose(props, ["initialState", "defaultColumn", "getSubRows", "getRowId", "stateReducer", "useControlledState"]);
        return _extends({}, rest, {
          initialState,
          defaultColumn: defaultColumn2,
          getSubRows,
          getRowId,
          stateReducer,
          useControlledState
        });
      }
      var useTable = function useTable2(props) {
        for (var _len = arguments.length, plugins = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          plugins[_key - 1] = arguments[_key];
        }
        props = applyDefaults(props);
        plugins = [useColumnVisibility].concat(plugins);
        var instanceRef = React.useRef({});
        var getInstance = useGetLatest(instanceRef.current);
        Object.assign(getInstance(), _extends({}, props, {
          plugins,
          hooks: makeDefaultPluginHooks()
        }));
        plugins.filter(Boolean).forEach(function(plugin) {
          plugin(getInstance().hooks);
        });
        var getHooks = useGetLatest(getInstance().hooks);
        getInstance().getHooks = getHooks;
        delete getInstance().hooks;
        Object.assign(getInstance(), reduceHooks(getHooks().useOptions, applyDefaults(props)));
        var _getInstance = getInstance(), data = _getInstance.data, userColumns = _getInstance.columns, initialState = _getInstance.initialState, defaultColumn2 = _getInstance.defaultColumn, getSubRows = _getInstance.getSubRows, getRowId = _getInstance.getRowId, stateReducer = _getInstance.stateReducer, useControlledState = _getInstance.useControlledState;
        var getStateReducer = useGetLatest(stateReducer);
        var reducer2 = React.useCallback(function(state2, action) {
          if (!action.type) {
            console.info({
              action
            });
            throw new Error("Unknown Action 👆");
          }
          return [].concat(getHooks().stateReducers, Array.isArray(getStateReducer()) ? getStateReducer() : [getStateReducer()]).reduce(function(s, handler) {
            return handler(s, action, state2, getInstance()) || s;
          }, state2);
        }, [getHooks, getStateReducer, getInstance]);
        var _React$useReducer = React.useReducer(reducer2, void 0, function() {
          return reducer2(initialState, {
            type: actions.init
          });
        }), reducerState = _React$useReducer[0], dispatch = _React$useReducer[1];
        var state = reduceHooks([].concat(getHooks().useControlledState, [useControlledState]), reducerState, {
          instance: getInstance()
        });
        Object.assign(getInstance(), {
          state,
          dispatch
        });
        var columns = React.useMemo(function() {
          return linkColumnStructure(reduceHooks(getHooks().columns, userColumns, {
            instance: getInstance()
          }));
        }, [getHooks, getInstance, userColumns].concat(reduceHooks(getHooks().columnsDeps, [], {
          instance: getInstance()
        })));
        getInstance().columns = columns;
        var allColumns2 = React.useMemo(function() {
          return reduceHooks(getHooks().allColumns, flattenColumns(columns), {
            instance: getInstance()
          }).map(assignColumnAccessor);
        }, [columns, getHooks, getInstance].concat(reduceHooks(getHooks().allColumnsDeps, [], {
          instance: getInstance()
        })));
        getInstance().allColumns = allColumns2;
        var _React$useMemo = React.useMemo(function() {
          var rows2 = [];
          var flatRows2 = [];
          var rowsById2 = {};
          var allColumnsQueue = [].concat(allColumns2);
          while (allColumnsQueue.length) {
            var column = allColumnsQueue.shift();
            accessRowsForColumn({
              data,
              rows: rows2,
              flatRows: flatRows2,
              rowsById: rowsById2,
              column,
              getRowId,
              getSubRows,
              accessValueHooks: getHooks().accessValue,
              getInstance
            });
          }
          return [rows2, flatRows2, rowsById2];
        }, [allColumns2, data, getRowId, getSubRows, getHooks, getInstance]), rows = _React$useMemo[0], flatRows = _React$useMemo[1], rowsById = _React$useMemo[2];
        Object.assign(getInstance(), {
          rows,
          initialRows: [].concat(rows),
          flatRows,
          rowsById
          // materializedColumns,
        });
        loopHooks(getHooks().useInstanceAfterData, getInstance());
        var visibleColumns2 = React.useMemo(function() {
          return reduceHooks(getHooks().visibleColumns, allColumns2, {
            instance: getInstance()
          }).map(function(d) {
            return decorateColumn(d, defaultColumn2);
          });
        }, [getHooks, allColumns2, getInstance, defaultColumn2].concat(reduceHooks(getHooks().visibleColumnsDeps, [], {
          instance: getInstance()
        })));
        allColumns2 = React.useMemo(function() {
          var columns2 = [].concat(visibleColumns2);
          allColumns2.forEach(function(column) {
            if (!columns2.find(function(d) {
              return d.id === column.id;
            })) {
              columns2.push(column);
            }
          });
          return columns2;
        }, [allColumns2, visibleColumns2]);
        getInstance().allColumns = allColumns2;
        {
          var duplicateColumns = allColumns2.filter(function(column, i) {
            return allColumns2.findIndex(function(d) {
              return d.id === column.id;
            }) !== i;
          });
          if (duplicateColumns.length) {
            console.info(allColumns2);
            throw new Error('Duplicate columns were found with ids: "' + duplicateColumns.map(function(d) {
              return d.id;
            }).join(", ") + '" in the columns array above');
          }
        }
        var headerGroups = React.useMemo(function() {
          return reduceHooks(getHooks().headerGroups, makeHeaderGroups(visibleColumns2, defaultColumn2), getInstance());
        }, [getHooks, visibleColumns2, defaultColumn2, getInstance].concat(reduceHooks(getHooks().headerGroupsDeps, [], {
          instance: getInstance()
        })));
        getInstance().headerGroups = headerGroups;
        var headers = React.useMemo(function() {
          return headerGroups.length ? headerGroups[0].headers : [];
        }, [headerGroups]);
        getInstance().headers = headers;
        getInstance().flatHeaders = headerGroups.reduce(function(all, headerGroup) {
          return [].concat(all, headerGroup.headers);
        }, []);
        loopHooks(getHooks().useInstanceBeforeDimensions, getInstance());
        var visibleColumnsDep = visibleColumns2.filter(function(d) {
          return d.isVisible;
        }).map(function(d) {
          return d.id;
        }).sort().join("_");
        visibleColumns2 = React.useMemo(
          function() {
            return visibleColumns2.filter(function(d) {
              return d.isVisible;
            });
          },
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [visibleColumns2, visibleColumnsDep]
        );
        getInstance().visibleColumns = visibleColumns2;
        var _calculateHeaderWidth = calculateHeaderWidths(headers), totalColumnsMinWidth = _calculateHeaderWidth[0], totalColumnsWidth = _calculateHeaderWidth[1], totalColumnsMaxWidth = _calculateHeaderWidth[2];
        getInstance().totalColumnsMinWidth = totalColumnsMinWidth;
        getInstance().totalColumnsWidth = totalColumnsWidth;
        getInstance().totalColumnsMaxWidth = totalColumnsMaxWidth;
        loopHooks(getHooks().useInstance, getInstance());
        [].concat(getInstance().flatHeaders, getInstance().allColumns).forEach(function(column) {
          column.render = makeRenderer(getInstance(), column);
          column.getHeaderProps = makePropGetter(getHooks().getHeaderProps, {
            instance: getInstance(),
            column
          });
          column.getFooterProps = makePropGetter(getHooks().getFooterProps, {
            instance: getInstance(),
            column
          });
        });
        getInstance().headerGroups = React.useMemo(function() {
          return headerGroups.filter(function(headerGroup, i) {
            headerGroup.headers = headerGroup.headers.filter(function(column) {
              var recurse = function recurse2(headers2) {
                return headers2.filter(function(column2) {
                  if (column2.headers) {
                    return recurse2(column2.headers);
                  }
                  return column2.isVisible;
                }).length;
              };
              if (column.headers) {
                return recurse(column.headers);
              }
              return column.isVisible;
            });
            if (headerGroup.headers.length) {
              headerGroup.getHeaderGroupProps = makePropGetter(getHooks().getHeaderGroupProps, {
                instance: getInstance(),
                headerGroup,
                index: i
              });
              headerGroup.getFooterGroupProps = makePropGetter(getHooks().getFooterGroupProps, {
                instance: getInstance(),
                headerGroup,
                index: i
              });
              return true;
            }
            return false;
          });
        }, [headerGroups, getInstance, getHooks]);
        getInstance().footerGroups = [].concat(getInstance().headerGroups).reverse();
        getInstance().prepareRow = React.useCallback(function(row) {
          row.getRowProps = makePropGetter(getHooks().getRowProps, {
            instance: getInstance(),
            row
          });
          row.allCells = allColumns2.map(function(column) {
            var value = row.values[column.id];
            var cell = {
              column,
              row,
              value
            };
            cell.getCellProps = makePropGetter(getHooks().getCellProps, {
              instance: getInstance(),
              cell
            });
            cell.render = makeRenderer(getInstance(), column, {
              row,
              cell,
              value
            });
            return cell;
          });
          row.cells = visibleColumns2.map(function(column) {
            return row.allCells.find(function(cell) {
              return cell.column.id === column.id;
            });
          });
          loopHooks(getHooks().prepareRow, row, {
            instance: getInstance()
          });
        }, [getHooks, getInstance, allColumns2, visibleColumns2]);
        getInstance().getTableProps = makePropGetter(getHooks().getTableProps, {
          instance: getInstance()
        });
        getInstance().getTableBodyProps = makePropGetter(getHooks().getTableBodyProps, {
          instance: getInstance()
        });
        loopHooks(getHooks().useFinalInstance, getInstance());
        return getInstance();
      };
      function calculateHeaderWidths(headers, left) {
        if (left === void 0) {
          left = 0;
        }
        var sumTotalMinWidth = 0;
        var sumTotalWidth = 0;
        var sumTotalMaxWidth = 0;
        var sumTotalFlexWidth = 0;
        headers.forEach(function(header) {
          var subHeaders = header.headers;
          header.totalLeft = left;
          if (subHeaders && subHeaders.length) {
            var _calculateHeaderWidth2 = calculateHeaderWidths(subHeaders, left), totalMinWidth = _calculateHeaderWidth2[0], totalWidth = _calculateHeaderWidth2[1], totalMaxWidth = _calculateHeaderWidth2[2], totalFlexWidth = _calculateHeaderWidth2[3];
            header.totalMinWidth = totalMinWidth;
            header.totalWidth = totalWidth;
            header.totalMaxWidth = totalMaxWidth;
            header.totalFlexWidth = totalFlexWidth;
          } else {
            header.totalMinWidth = header.minWidth;
            header.totalWidth = Math.min(Math.max(header.minWidth, header.width), header.maxWidth);
            header.totalMaxWidth = header.maxWidth;
            header.totalFlexWidth = header.canResize ? header.totalWidth : 0;
          }
          if (header.isVisible) {
            left += header.totalWidth;
            sumTotalMinWidth += header.totalMinWidth;
            sumTotalWidth += header.totalWidth;
            sumTotalMaxWidth += header.totalMaxWidth;
            sumTotalFlexWidth += header.totalFlexWidth;
          }
        });
        return [sumTotalMinWidth, sumTotalWidth, sumTotalMaxWidth, sumTotalFlexWidth];
      }
      function accessRowsForColumn(_ref) {
        var data = _ref.data, rows = _ref.rows, flatRows = _ref.flatRows, rowsById = _ref.rowsById, column = _ref.column, getRowId = _ref.getRowId, getSubRows = _ref.getSubRows, accessValueHooks = _ref.accessValueHooks, getInstance = _ref.getInstance;
        var accessRow = function accessRow2(originalRow, rowIndex, depth, parent, parentRows) {
          if (depth === void 0) {
            depth = 0;
          }
          var original = originalRow;
          var id = getRowId(originalRow, rowIndex, parent);
          var row = rowsById[id];
          if (!row) {
            row = {
              id,
              original,
              index: rowIndex,
              depth,
              cells: [{}]
              // This is a dummy cell
            };
            row.cells.map = unpreparedAccessWarning;
            row.cells.filter = unpreparedAccessWarning;
            row.cells.forEach = unpreparedAccessWarning;
            row.cells[0].getCellProps = unpreparedAccessWarning;
            row.values = {};
            parentRows.push(row);
            flatRows.push(row);
            rowsById[id] = row;
            row.originalSubRows = getSubRows(originalRow, rowIndex);
            if (row.originalSubRows) {
              var subRows = [];
              row.originalSubRows.forEach(function(d, i) {
                return accessRow2(d, i, depth + 1, row, subRows);
              });
              row.subRows = subRows;
            }
          } else if (row.subRows) {
            row.originalSubRows.forEach(function(d, i) {
              return accessRow2(d, i, depth + 1, row);
            });
          }
          if (column.accessor) {
            row.values[column.id] = column.accessor(originalRow, rowIndex, row, parentRows, data);
          }
          row.values[column.id] = reduceHooks(accessValueHooks, row.values[column.id], {
            row,
            column,
            instance: getInstance()
          }, true);
        };
        data.forEach(function(originalRow, rowIndex) {
          return accessRow(originalRow, rowIndex, 0, void 0, rows);
        });
      }
      actions.resetExpanded = "resetExpanded";
      actions.toggleRowExpanded = "toggleRowExpanded";
      actions.toggleAllRowsExpanded = "toggleAllRowsExpanded";
      var useExpanded = function useExpanded2(hooks) {
        hooks.getToggleAllRowsExpandedProps = [defaultGetToggleAllRowsExpandedProps];
        hooks.getToggleRowExpandedProps = [defaultGetToggleRowExpandedProps];
        hooks.stateReducers.push(reducer$1);
        hooks.useInstance.push(useInstance$1);
        hooks.prepareRow.push(prepareRow);
      };
      useExpanded.pluginName = "useExpanded";
      var defaultGetToggleAllRowsExpandedProps = function defaultGetToggleAllRowsExpandedProps2(props, _ref) {
        var instance = _ref.instance;
        return [props, {
          onClick: function onClick(e) {
            instance.toggleAllRowsExpanded();
          },
          style: {
            cursor: "pointer"
          },
          title: "Toggle All Rows Expanded"
        }];
      };
      var defaultGetToggleRowExpandedProps = function defaultGetToggleRowExpandedProps2(props, _ref2) {
        var row = _ref2.row;
        return [props, {
          onClick: function onClick() {
            row.toggleRowExpanded();
          },
          style: {
            cursor: "pointer"
          },
          title: "Toggle Row Expanded"
        }];
      };
      function reducer$1(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            expanded: {}
          }, state);
        }
        if (action.type === actions.resetExpanded) {
          return _extends({}, state, {
            expanded: instance.initialState.expanded || {}
          });
        }
        if (action.type === actions.toggleAllRowsExpanded) {
          var value = action.value;
          var rowsById = instance.rowsById;
          var isAllRowsExpanded = Object.keys(rowsById).length === Object.keys(state.expanded).length;
          var expandAll = typeof value !== "undefined" ? value : !isAllRowsExpanded;
          if (expandAll) {
            var expanded = {};
            Object.keys(rowsById).forEach(function(rowId) {
              expanded[rowId] = true;
            });
            return _extends({}, state, {
              expanded
            });
          }
          return _extends({}, state, {
            expanded: {}
          });
        }
        if (action.type === actions.toggleRowExpanded) {
          var id = action.id, setExpanded = action.value;
          var exists = state.expanded[id];
          var shouldExist = typeof setExpanded !== "undefined" ? setExpanded : !exists;
          if (!exists && shouldExist) {
            var _extends2;
            return _extends({}, state, {
              expanded: _extends({}, state.expanded, (_extends2 = {}, _extends2[id] = true, _extends2))
            });
          } else if (exists && !shouldExist) {
            var _state$expanded = state.expanded, _ = _state$expanded[id], rest = _objectWithoutPropertiesLoose(_state$expanded, [id].map(_toPropertyKey));
            return _extends({}, state, {
              expanded: rest
            });
          } else {
            return state;
          }
        }
      }
      function useInstance$1(instance) {
        var data = instance.data, rows = instance.rows, rowsById = instance.rowsById, _instance$manualExpan = instance.manualExpandedKey, manualExpandedKey = _instance$manualExpan === void 0 ? "expanded" : _instance$manualExpan, _instance$paginateExp = instance.paginateExpandedRows, paginateExpandedRows = _instance$paginateExp === void 0 ? true : _instance$paginateExp, _instance$expandSubRo = instance.expandSubRows, expandSubRows = _instance$expandSubRo === void 0 ? true : _instance$expandSubRo, _instance$autoResetEx = instance.autoResetExpanded, autoResetExpanded = _instance$autoResetEx === void 0 ? true : _instance$autoResetEx, getHooks = instance.getHooks, plugins = instance.plugins, expanded = instance.state.expanded, dispatch = instance.dispatch;
        ensurePluginOrder(plugins, ["useSortBy", "useGroupBy", "usePivotColumns", "useGlobalFilter"], "useExpanded");
        var getAutoResetExpanded = useGetLatest(autoResetExpanded);
        var isAllRowsExpanded = Boolean(Object.keys(rowsById).length && Object.keys(expanded).length);
        if (isAllRowsExpanded) {
          if (Object.keys(rowsById).some(function(id) {
            return !expanded[id];
          })) {
            isAllRowsExpanded = false;
          }
        }
        useMountedLayoutEffect(function() {
          if (getAutoResetExpanded()) {
            dispatch({
              type: actions.resetExpanded
            });
          }
        }, [dispatch, data]);
        var toggleRowExpanded = React.useCallback(function(id, value) {
          dispatch({
            type: actions.toggleRowExpanded,
            id,
            value
          });
        }, [dispatch]);
        var toggleAllRowsExpanded = React.useCallback(function(value) {
          return dispatch({
            type: actions.toggleAllRowsExpanded,
            value
          });
        }, [dispatch]);
        var expandedRows = React.useMemo(function() {
          if (paginateExpandedRows) {
            return expandRows(rows, {
              manualExpandedKey,
              expanded,
              expandSubRows
            });
          }
          return rows;
        }, [paginateExpandedRows, rows, manualExpandedKey, expanded, expandSubRows]);
        var expandedDepth = React.useMemo(function() {
          return findExpandedDepth(expanded);
        }, [expanded]);
        var getInstance = useGetLatest(instance);
        var getToggleAllRowsExpandedProps = makePropGetter(getHooks().getToggleAllRowsExpandedProps, {
          instance: getInstance()
        });
        Object.assign(instance, {
          preExpandedRows: rows,
          expandedRows,
          rows: expandedRows,
          expandedDepth,
          isAllRowsExpanded,
          toggleRowExpanded,
          toggleAllRowsExpanded,
          getToggleAllRowsExpandedProps
        });
      }
      function prepareRow(row, _ref3) {
        var getHooks = _ref3.instance.getHooks, instance = _ref3.instance;
        row.toggleRowExpanded = function(set) {
          return instance.toggleRowExpanded(row.id, set);
        };
        row.getToggleRowExpandedProps = makePropGetter(getHooks().getToggleRowExpandedProps, {
          instance,
          row
        });
      }
      function findExpandedDepth(expanded) {
        var maxDepth = 0;
        Object.keys(expanded).forEach(function(id) {
          var splitId = id.split(".");
          maxDepth = Math.max(maxDepth, splitId.length);
        });
        return maxDepth;
      }
      var text = function text2(rows, ids, filterValue) {
        rows = rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase());
          });
        });
        return rows;
      };
      text.autoRemove = function(val) {
        return !val;
      };
      var exactText = function exactText2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue !== void 0 ? String(rowValue).toLowerCase() === String(filterValue).toLowerCase() : true;
          });
        });
      };
      exactText.autoRemove = function(val) {
        return !val;
      };
      var exactTextCase = function exactTextCase2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue !== void 0 ? String(rowValue) === String(filterValue) : true;
          });
        });
      };
      exactTextCase.autoRemove = function(val) {
        return !val;
      };
      var includes = function includes2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue.includes(filterValue);
          });
        });
      };
      includes.autoRemove = function(val) {
        return !val || !val.length;
      };
      var includesAll = function includesAll2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue && rowValue.length && filterValue.every(function(val) {
              return rowValue.includes(val);
            });
          });
        });
      };
      includesAll.autoRemove = function(val) {
        return !val || !val.length;
      };
      var includesSome = function includesSome2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue && rowValue.length && filterValue.some(function(val) {
              return rowValue.includes(val);
            });
          });
        });
      };
      includesSome.autoRemove = function(val) {
        return !val || !val.length;
      };
      var includesValue = function includesValue2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return filterValue.includes(rowValue);
          });
        });
      };
      includesValue.autoRemove = function(val) {
        return !val || !val.length;
      };
      var exact = function exact2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue === filterValue;
          });
        });
      };
      exact.autoRemove = function(val) {
        return typeof val === "undefined";
      };
      var equals = function equals2(rows, ids, filterValue) {
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue == filterValue;
          });
        });
      };
      equals.autoRemove = function(val) {
        return val == null;
      };
      var between = function between2(rows, ids, filterValue) {
        var _ref = filterValue || [], min2 = _ref[0], max2 = _ref[1];
        min2 = typeof min2 === "number" ? min2 : -Infinity;
        max2 = typeof max2 === "number" ? max2 : Infinity;
        if (min2 > max2) {
          var temp = min2;
          min2 = max2;
          max2 = temp;
        }
        return rows.filter(function(row) {
          return ids.some(function(id) {
            var rowValue = row.values[id];
            return rowValue >= min2 && rowValue <= max2;
          });
        });
      };
      between.autoRemove = function(val) {
        return !val || typeof val[0] !== "number" && typeof val[1] !== "number";
      };
      var filterTypes = Object.freeze({
        __proto__: null,
        text,
        exactText,
        exactTextCase,
        includes,
        includesAll,
        includesSome,
        includesValue,
        exact,
        equals,
        between
      });
      actions.resetFilters = "resetFilters";
      actions.setFilter = "setFilter";
      actions.setAllFilters = "setAllFilters";
      var useFilters = function useFilters2(hooks) {
        hooks.stateReducers.push(reducer$2);
        hooks.useInstance.push(useInstance$2);
      };
      useFilters.pluginName = "useFilters";
      function reducer$2(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            filters: []
          }, state);
        }
        if (action.type === actions.resetFilters) {
          return _extends({}, state, {
            filters: instance.initialState.filters || []
          });
        }
        if (action.type === actions.setFilter) {
          var columnId = action.columnId, filterValue = action.filterValue;
          var allColumns2 = instance.allColumns, userFilterTypes = instance.filterTypes;
          var column = allColumns2.find(function(d) {
            return d.id === columnId;
          });
          if (!column) {
            throw new Error("React-Table: Could not find a column with id: " + columnId);
          }
          var filterMethod = getFilterMethod(column.filter, userFilterTypes || {}, filterTypes);
          var previousfilter = state.filters.find(function(d) {
            return d.id === columnId;
          });
          var newFilter = functionalUpdate(filterValue, previousfilter && previousfilter.value);
          if (shouldAutoRemoveFilter(filterMethod.autoRemove, newFilter, column)) {
            return _extends({}, state, {
              filters: state.filters.filter(function(d) {
                return d.id !== columnId;
              })
            });
          }
          if (previousfilter) {
            return _extends({}, state, {
              filters: state.filters.map(function(d) {
                if (d.id === columnId) {
                  return {
                    id: columnId,
                    value: newFilter
                  };
                }
                return d;
              })
            });
          }
          return _extends({}, state, {
            filters: [].concat(state.filters, [{
              id: columnId,
              value: newFilter
            }])
          });
        }
        if (action.type === actions.setAllFilters) {
          var filters = action.filters;
          var _allColumns = instance.allColumns, _userFilterTypes = instance.filterTypes;
          return _extends({}, state, {
            // Filter out undefined values
            filters: functionalUpdate(filters, state.filters).filter(function(filter) {
              var column2 = _allColumns.find(function(d) {
                return d.id === filter.id;
              });
              var filterMethod2 = getFilterMethod(column2.filter, _userFilterTypes || {}, filterTypes);
              if (shouldAutoRemoveFilter(filterMethod2.autoRemove, filter.value, column2)) {
                return false;
              }
              return true;
            })
          });
        }
      }
      function useInstance$2(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, rowsById = instance.rowsById, allColumns2 = instance.allColumns, userFilterTypes = instance.filterTypes, manualFilters = instance.manualFilters, _instance$defaultCanF = instance.defaultCanFilter, defaultCanFilter = _instance$defaultCanF === void 0 ? false : _instance$defaultCanF, disableFilters = instance.disableFilters, filters = instance.state.filters, dispatch = instance.dispatch, _instance$autoResetFi = instance.autoResetFilters, autoResetFilters = _instance$autoResetFi === void 0 ? true : _instance$autoResetFi;
        var setFilter = React.useCallback(function(columnId, filterValue) {
          dispatch({
            type: actions.setFilter,
            columnId,
            filterValue
          });
        }, [dispatch]);
        var setAllFilters = React.useCallback(function(filters2) {
          dispatch({
            type: actions.setAllFilters,
            filters: filters2
          });
        }, [dispatch]);
        allColumns2.forEach(function(column) {
          var id = column.id, accessor = column.accessor, columnDefaultCanFilter = column.defaultCanFilter, columnDisableFilters = column.disableFilters;
          column.canFilter = accessor ? getFirstDefined(columnDisableFilters === true ? false : void 0, disableFilters === true ? false : void 0, true) : getFirstDefined(columnDefaultCanFilter, defaultCanFilter, false);
          column.setFilter = function(val) {
            return setFilter(column.id, val);
          };
          var found = filters.find(function(d) {
            return d.id === id;
          });
          column.filterValue = found && found.value;
        });
        var _React$useMemo = React.useMemo(function() {
          if (manualFilters || !filters.length) {
            return [rows, flatRows, rowsById];
          }
          var filteredFlatRows2 = [];
          var filteredRowsById2 = {};
          var filterRows = function filterRows2(rows2, depth) {
            if (depth === void 0) {
              depth = 0;
            }
            var filteredRows2 = rows2;
            filteredRows2 = filters.reduce(function(filteredSoFar, _ref) {
              var columnId = _ref.id, filterValue = _ref.value;
              var column = allColumns2.find(function(d) {
                return d.id === columnId;
              });
              if (!column) {
                return filteredSoFar;
              }
              if (depth === 0) {
                column.preFilteredRows = filteredSoFar;
              }
              var filterMethod = getFilterMethod(column.filter, userFilterTypes || {}, filterTypes);
              if (!filterMethod) {
                console.warn("Could not find a valid 'column.filter' for column with the ID: " + column.id + ".");
                return filteredSoFar;
              }
              column.filteredRows = filterMethod(filteredSoFar, [columnId], filterValue);
              return column.filteredRows;
            }, rows2);
            filteredRows2.forEach(function(row) {
              filteredFlatRows2.push(row);
              filteredRowsById2[row.id] = row;
              if (!row.subRows) {
                return;
              }
              row.subRows = row.subRows && row.subRows.length > 0 ? filterRows2(row.subRows, depth + 1) : row.subRows;
            });
            return filteredRows2;
          };
          return [filterRows(rows), filteredFlatRows2, filteredRowsById2];
        }, [manualFilters, filters, rows, flatRows, rowsById, allColumns2, userFilterTypes]), filteredRows = _React$useMemo[0], filteredFlatRows = _React$useMemo[1], filteredRowsById = _React$useMemo[2];
        React.useMemo(function() {
          var nonFilteredColumns = allColumns2.filter(function(column) {
            return !filters.find(function(d) {
              return d.id === column.id;
            });
          });
          nonFilteredColumns.forEach(function(column) {
            column.preFilteredRows = filteredRows;
            column.filteredRows = filteredRows;
          });
        }, [filteredRows, filters, allColumns2]);
        var getAutoResetFilters = useGetLatest(autoResetFilters);
        useMountedLayoutEffect(function() {
          if (getAutoResetFilters()) {
            dispatch({
              type: actions.resetFilters
            });
          }
        }, [dispatch, manualFilters ? null : data]);
        Object.assign(instance, {
          preFilteredRows: rows,
          preFilteredFlatRows: flatRows,
          preFilteredRowsById: rowsById,
          filteredRows,
          filteredFlatRows,
          filteredRowsById,
          rows: filteredRows,
          flatRows: filteredFlatRows,
          rowsById: filteredRowsById,
          setFilter,
          setAllFilters
        });
      }
      actions.resetGlobalFilter = "resetGlobalFilter";
      actions.setGlobalFilter = "setGlobalFilter";
      var useGlobalFilter = function useGlobalFilter2(hooks) {
        hooks.stateReducers.push(reducer$3);
        hooks.useInstance.push(useInstance$3);
      };
      useGlobalFilter.pluginName = "useGlobalFilter";
      function reducer$3(state, action, previousState, instance) {
        if (action.type === actions.resetGlobalFilter) {
          return _extends({}, state, {
            globalFilter: instance.initialState.globalFilter || void 0
          });
        }
        if (action.type === actions.setGlobalFilter) {
          var filterValue = action.filterValue;
          var userFilterTypes = instance.userFilterTypes;
          var filterMethod = getFilterMethod(instance.globalFilter, userFilterTypes || {}, filterTypes);
          var newFilter = functionalUpdate(filterValue, state.globalFilter);
          if (shouldAutoRemoveFilter(filterMethod.autoRemove, newFilter)) {
            var globalFilter = state.globalFilter, stateWithoutGlobalFilter = _objectWithoutPropertiesLoose(state, ["globalFilter"]);
            return stateWithoutGlobalFilter;
          }
          return _extends({}, state, {
            globalFilter: newFilter
          });
        }
      }
      function useInstance$3(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, rowsById = instance.rowsById, allColumns2 = instance.allColumns, userFilterTypes = instance.filterTypes, globalFilter = instance.globalFilter, manualGlobalFilter = instance.manualGlobalFilter, globalFilterValue = instance.state.globalFilter, dispatch = instance.dispatch, _instance$autoResetGl = instance.autoResetGlobalFilter, autoResetGlobalFilter = _instance$autoResetGl === void 0 ? true : _instance$autoResetGl, disableGlobalFilter = instance.disableGlobalFilter;
        var setGlobalFilter = React.useCallback(function(filterValue) {
          dispatch({
            type: actions.setGlobalFilter,
            filterValue
          });
        }, [dispatch]);
        var _React$useMemo = React.useMemo(function() {
          if (manualGlobalFilter || typeof globalFilterValue === "undefined") {
            return [rows, flatRows, rowsById];
          }
          var filteredFlatRows = [];
          var filteredRowsById = {};
          var filterMethod = getFilterMethod(globalFilter, userFilterTypes || {}, filterTypes);
          if (!filterMethod) {
            console.warn("Could not find a valid 'globalFilter' option.");
            return rows;
          }
          allColumns2.forEach(function(column) {
            var columnDisableGlobalFilter = column.disableGlobalFilter;
            column.canFilter = getFirstDefined(columnDisableGlobalFilter === true ? false : void 0, disableGlobalFilter === true ? false : void 0, true);
          });
          var filterableColumns = allColumns2.filter(function(c) {
            return c.canFilter === true;
          });
          var filterRows = function filterRows2(filteredRows) {
            filteredRows = filterMethod(filteredRows, filterableColumns.map(function(d) {
              return d.id;
            }), globalFilterValue);
            filteredRows.forEach(function(row) {
              filteredFlatRows.push(row);
              filteredRowsById[row.id] = row;
              row.subRows = row.subRows && row.subRows.length ? filterRows2(row.subRows) : row.subRows;
            });
            return filteredRows;
          };
          return [filterRows(rows), filteredFlatRows, filteredRowsById];
        }, [manualGlobalFilter, globalFilterValue, globalFilter, userFilterTypes, allColumns2, rows, flatRows, rowsById, disableGlobalFilter]), globalFilteredRows = _React$useMemo[0], globalFilteredFlatRows = _React$useMemo[1], globalFilteredRowsById = _React$useMemo[2];
        var getAutoResetGlobalFilter = useGetLatest(autoResetGlobalFilter);
        useMountedLayoutEffect(function() {
          if (getAutoResetGlobalFilter()) {
            dispatch({
              type: actions.resetGlobalFilter
            });
          }
        }, [dispatch, manualGlobalFilter ? null : data]);
        Object.assign(instance, {
          preGlobalFilteredRows: rows,
          preGlobalFilteredFlatRows: flatRows,
          preGlobalFilteredRowsById: rowsById,
          globalFilteredRows,
          globalFilteredFlatRows,
          globalFilteredRowsById,
          rows: globalFilteredRows,
          flatRows: globalFilteredFlatRows,
          rowsById: globalFilteredRowsById,
          setGlobalFilter,
          disableGlobalFilter
        });
      }
      function sum(values, aggregatedValues) {
        return aggregatedValues.reduce(function(sum2, next) {
          return sum2 + (typeof next === "number" ? next : 0);
        }, 0);
      }
      function min(values) {
        var min2 = values[0] || 0;
        values.forEach(function(value) {
          if (typeof value === "number") {
            min2 = Math.min(min2, value);
          }
        });
        return min2;
      }
      function max(values) {
        var max2 = values[0] || 0;
        values.forEach(function(value) {
          if (typeof value === "number") {
            max2 = Math.max(max2, value);
          }
        });
        return max2;
      }
      function minMax(values) {
        var min2 = values[0] || 0;
        var max2 = values[0] || 0;
        values.forEach(function(value) {
          if (typeof value === "number") {
            min2 = Math.min(min2, value);
            max2 = Math.max(max2, value);
          }
        });
        return min2 + ".." + max2;
      }
      function average(values) {
        return sum(null, values) / values.length;
      }
      function median(values) {
        if (!values.length) {
          return null;
        }
        var mid = Math.floor(values.length / 2);
        var nums = [].concat(values).sort(function(a, b) {
          return a - b;
        });
        return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
      }
      function unique(values) {
        return Array.from(new Set(values).values());
      }
      function uniqueCount(values) {
        return new Set(values).size;
      }
      function count(values) {
        return values.length;
      }
      var aggregations = Object.freeze({
        __proto__: null,
        sum,
        min,
        max,
        minMax,
        average,
        median,
        unique,
        uniqueCount,
        count
      });
      var emptyArray = [];
      var emptyObject = {};
      actions.resetGroupBy = "resetGroupBy";
      actions.setGroupBy = "setGroupBy";
      actions.toggleGroupBy = "toggleGroupBy";
      var useGroupBy = function useGroupBy2(hooks) {
        hooks.getGroupByToggleProps = [defaultGetGroupByToggleProps];
        hooks.stateReducers.push(reducer$4);
        hooks.visibleColumnsDeps.push(function(deps, _ref) {
          var instance = _ref.instance;
          return [].concat(deps, [instance.state.groupBy]);
        });
        hooks.visibleColumns.push(visibleColumns);
        hooks.useInstance.push(useInstance$4);
        hooks.prepareRow.push(prepareRow$1);
      };
      useGroupBy.pluginName = "useGroupBy";
      var defaultGetGroupByToggleProps = function defaultGetGroupByToggleProps2(props, _ref2) {
        var header = _ref2.header;
        return [props, {
          onClick: header.canGroupBy ? function(e) {
            e.persist();
            header.toggleGroupBy();
          } : void 0,
          style: {
            cursor: header.canGroupBy ? "pointer" : void 0
          },
          title: "Toggle GroupBy"
        }];
      };
      function reducer$4(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            groupBy: []
          }, state);
        }
        if (action.type === actions.resetGroupBy) {
          return _extends({}, state, {
            groupBy: instance.initialState.groupBy || []
          });
        }
        if (action.type === actions.setGroupBy) {
          var value = action.value;
          return _extends({}, state, {
            groupBy: value
          });
        }
        if (action.type === actions.toggleGroupBy) {
          var columnId = action.columnId, setGroupBy = action.value;
          var resolvedGroupBy = typeof setGroupBy !== "undefined" ? setGroupBy : !state.groupBy.includes(columnId);
          if (resolvedGroupBy) {
            return _extends({}, state, {
              groupBy: [].concat(state.groupBy, [columnId])
            });
          }
          return _extends({}, state, {
            groupBy: state.groupBy.filter(function(d) {
              return d !== columnId;
            })
          });
        }
      }
      function visibleColumns(columns, _ref3) {
        var groupBy = _ref3.instance.state.groupBy;
        var groupByColumns = groupBy.map(function(g) {
          return columns.find(function(col) {
            return col.id === g;
          });
        }).filter(Boolean);
        var nonGroupByColumns = columns.filter(function(col) {
          return !groupBy.includes(col.id);
        });
        columns = [].concat(groupByColumns, nonGroupByColumns);
        columns.forEach(function(column) {
          column.isGrouped = groupBy.includes(column.id);
          column.groupedIndex = groupBy.indexOf(column.id);
        });
        return columns;
      }
      var defaultUserAggregations = {};
      function useInstance$4(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, rowsById = instance.rowsById, allColumns2 = instance.allColumns, flatHeaders = instance.flatHeaders, _instance$groupByFn = instance.groupByFn, groupByFn = _instance$groupByFn === void 0 ? defaultGroupByFn : _instance$groupByFn, manualGroupBy = instance.manualGroupBy, _instance$aggregation = instance.aggregations, userAggregations = _instance$aggregation === void 0 ? defaultUserAggregations : _instance$aggregation, plugins = instance.plugins, groupBy = instance.state.groupBy, dispatch = instance.dispatch, _instance$autoResetGr = instance.autoResetGroupBy, autoResetGroupBy = _instance$autoResetGr === void 0 ? true : _instance$autoResetGr, disableGroupBy = instance.disableGroupBy, defaultCanGroupBy = instance.defaultCanGroupBy, getHooks = instance.getHooks;
        ensurePluginOrder(plugins, ["useColumnOrder", "useFilters"], "useGroupBy");
        var getInstance = useGetLatest(instance);
        allColumns2.forEach(function(column) {
          var accessor = column.accessor, defaultColumnGroupBy = column.defaultGroupBy, columnDisableGroupBy = column.disableGroupBy;
          column.canGroupBy = accessor ? getFirstDefined(column.canGroupBy, columnDisableGroupBy === true ? false : void 0, disableGroupBy === true ? false : void 0, true) : getFirstDefined(column.canGroupBy, defaultColumnGroupBy, defaultCanGroupBy, false);
          if (column.canGroupBy) {
            column.toggleGroupBy = function() {
              return instance.toggleGroupBy(column.id);
            };
          }
          column.Aggregated = column.Aggregated || column.Cell;
        });
        var toggleGroupBy = React.useCallback(function(columnId, value) {
          dispatch({
            type: actions.toggleGroupBy,
            columnId,
            value
          });
        }, [dispatch]);
        var setGroupBy = React.useCallback(function(value) {
          dispatch({
            type: actions.setGroupBy,
            value
          });
        }, [dispatch]);
        flatHeaders.forEach(function(header) {
          header.getGroupByToggleProps = makePropGetter(getHooks().getGroupByToggleProps, {
            instance: getInstance(),
            header
          });
        });
        var _React$useMemo = React.useMemo(function() {
          if (manualGroupBy || !groupBy.length) {
            return [rows, flatRows, rowsById, emptyArray, emptyObject, flatRows, rowsById];
          }
          var existingGroupBy = groupBy.filter(function(g) {
            return allColumns2.find(function(col) {
              return col.id === g;
            });
          });
          var aggregateRowsToValues = function aggregateRowsToValues2(leafRows, groupedRows3, depth) {
            var values = {};
            allColumns2.forEach(function(column) {
              if (existingGroupBy.includes(column.id)) {
                values[column.id] = groupedRows3[0] ? groupedRows3[0].values[column.id] : null;
                return;
              }
              var aggregateFn = typeof column.aggregate === "function" ? column.aggregate : userAggregations[column.aggregate] || aggregations[column.aggregate];
              if (aggregateFn) {
                var groupedValues = groupedRows3.map(function(row) {
                  return row.values[column.id];
                });
                var leafValues = leafRows.map(function(row) {
                  var columnValue = row.values[column.id];
                  if (!depth && column.aggregateValue) {
                    var aggregateValueFn = typeof column.aggregateValue === "function" ? column.aggregateValue : userAggregations[column.aggregateValue] || aggregations[column.aggregateValue];
                    if (!aggregateValueFn) {
                      console.info({
                        column
                      });
                      throw new Error("React Table: Invalid column.aggregateValue option for column listed above");
                    }
                    columnValue = aggregateValueFn(columnValue, row, column);
                  }
                  return columnValue;
                });
                values[column.id] = aggregateFn(leafValues, groupedValues);
              } else if (column.aggregate) {
                console.info({
                  column
                });
                throw new Error("React Table: Invalid column.aggregate option for column listed above");
              } else {
                values[column.id] = null;
              }
            });
            return values;
          };
          var groupedFlatRows2 = [];
          var groupedRowsById2 = {};
          var onlyGroupedFlatRows2 = [];
          var onlyGroupedRowsById2 = {};
          var nonGroupedFlatRows2 = [];
          var nonGroupedRowsById2 = {};
          var groupUpRecursively = function groupUpRecursively2(rows2, depth, parentId) {
            if (depth === void 0) {
              depth = 0;
            }
            if (depth === existingGroupBy.length) {
              return rows2.map(function(row) {
                return _extends({}, row, {
                  depth
                });
              });
            }
            var columnId = existingGroupBy[depth];
            var rowGroupsMap = groupByFn(rows2, columnId);
            var aggregatedGroupedRows = Object.entries(rowGroupsMap).map(function(_ref4, index) {
              var groupByVal = _ref4[0], groupedRows3 = _ref4[1];
              var id = columnId + ":" + groupByVal;
              id = parentId ? parentId + ">" + id : id;
              var subRows = groupUpRecursively2(groupedRows3, depth + 1, id);
              var leafRows = depth ? flattenBy(groupedRows3, "leafRows") : groupedRows3;
              var values = aggregateRowsToValues(leafRows, groupedRows3, depth);
              var row = {
                id,
                isGrouped: true,
                groupByID: columnId,
                groupByVal,
                values,
                subRows,
                leafRows,
                depth,
                index
              };
              subRows.forEach(function(subRow) {
                groupedFlatRows2.push(subRow);
                groupedRowsById2[subRow.id] = subRow;
                if (subRow.isGrouped) {
                  onlyGroupedFlatRows2.push(subRow);
                  onlyGroupedRowsById2[subRow.id] = subRow;
                } else {
                  nonGroupedFlatRows2.push(subRow);
                  nonGroupedRowsById2[subRow.id] = subRow;
                }
              });
              return row;
            });
            return aggregatedGroupedRows;
          };
          var groupedRows2 = groupUpRecursively(rows);
          groupedRows2.forEach(function(subRow) {
            groupedFlatRows2.push(subRow);
            groupedRowsById2[subRow.id] = subRow;
            if (subRow.isGrouped) {
              onlyGroupedFlatRows2.push(subRow);
              onlyGroupedRowsById2[subRow.id] = subRow;
            } else {
              nonGroupedFlatRows2.push(subRow);
              nonGroupedRowsById2[subRow.id] = subRow;
            }
          });
          return [groupedRows2, groupedFlatRows2, groupedRowsById2, onlyGroupedFlatRows2, onlyGroupedRowsById2, nonGroupedFlatRows2, nonGroupedRowsById2];
        }, [manualGroupBy, groupBy, rows, flatRows, rowsById, allColumns2, userAggregations, groupByFn]), groupedRows = _React$useMemo[0], groupedFlatRows = _React$useMemo[1], groupedRowsById = _React$useMemo[2], onlyGroupedFlatRows = _React$useMemo[3], onlyGroupedRowsById = _React$useMemo[4], nonGroupedFlatRows = _React$useMemo[5], nonGroupedRowsById = _React$useMemo[6];
        var getAutoResetGroupBy = useGetLatest(autoResetGroupBy);
        useMountedLayoutEffect(function() {
          if (getAutoResetGroupBy()) {
            dispatch({
              type: actions.resetGroupBy
            });
          }
        }, [dispatch, manualGroupBy ? null : data]);
        Object.assign(instance, {
          preGroupedRows: rows,
          preGroupedFlatRow: flatRows,
          preGroupedRowsById: rowsById,
          groupedRows,
          groupedFlatRows,
          groupedRowsById,
          onlyGroupedFlatRows,
          onlyGroupedRowsById,
          nonGroupedFlatRows,
          nonGroupedRowsById,
          rows: groupedRows,
          flatRows: groupedFlatRows,
          rowsById: groupedRowsById,
          toggleGroupBy,
          setGroupBy
        });
      }
      function prepareRow$1(row) {
        row.allCells.forEach(function(cell) {
          var _row$subRows;
          cell.isGrouped = cell.column.isGrouped && cell.column.id === row.groupByID;
          cell.isPlaceholder = !cell.isGrouped && cell.column.isGrouped;
          cell.isAggregated = !cell.isGrouped && !cell.isPlaceholder && ((_row$subRows = row.subRows) == null ? void 0 : _row$subRows.length);
        });
      }
      function defaultGroupByFn(rows, columnId) {
        return rows.reduce(function(prev, row, i) {
          var resKey = "" + row.values[columnId];
          prev[resKey] = Array.isArray(prev[resKey]) ? prev[resKey] : [];
          prev[resKey].push(row);
          return prev;
        }, {});
      }
      var reSplitAlphaNumeric = /([0-9]+)/gm;
      var alphanumeric = function alphanumeric2(rowA, rowB, columnId) {
        var _getRowValuesByColumn = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn[0], b = _getRowValuesByColumn[1];
        a = toString(a);
        b = toString(b);
        a = a.split(reSplitAlphaNumeric).filter(Boolean);
        b = b.split(reSplitAlphaNumeric).filter(Boolean);
        while (a.length && b.length) {
          var aa = a.shift();
          var bb = b.shift();
          var an = parseInt(aa, 10);
          var bn = parseInt(bb, 10);
          var combo = [an, bn].sort();
          if (isNaN(combo[0])) {
            if (aa > bb) {
              return 1;
            }
            if (bb > aa) {
              return -1;
            }
            continue;
          }
          if (isNaN(combo[1])) {
            return isNaN(an) ? -1 : 1;
          }
          if (an > bn) {
            return 1;
          }
          if (bn > an) {
            return -1;
          }
        }
        return a.length - b.length;
      };
      function datetime(rowA, rowB, columnId) {
        var _getRowValuesByColumn2 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn2[0], b = _getRowValuesByColumn2[1];
        a = a.getTime();
        b = b.getTime();
        return compareBasic(a, b);
      }
      function basic(rowA, rowB, columnId) {
        var _getRowValuesByColumn3 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn3[0], b = _getRowValuesByColumn3[1];
        return compareBasic(a, b);
      }
      function string(rowA, rowB, columnId) {
        var _getRowValuesByColumn4 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn4[0], b = _getRowValuesByColumn4[1];
        a = a.split("").filter(Boolean);
        b = b.split("").filter(Boolean);
        while (a.length && b.length) {
          var aa = a.shift();
          var bb = b.shift();
          var alower = aa.toLowerCase();
          var blower = bb.toLowerCase();
          if (alower > blower) {
            return 1;
          }
          if (blower > alower) {
            return -1;
          }
          if (aa > bb) {
            return 1;
          }
          if (bb > aa) {
            return -1;
          }
          continue;
        }
        return a.length - b.length;
      }
      function number(rowA, rowB, columnId) {
        var _getRowValuesByColumn5 = getRowValuesByColumnID(rowA, rowB, columnId), a = _getRowValuesByColumn5[0], b = _getRowValuesByColumn5[1];
        var replaceNonNumeric = /[^0-9.]/gi;
        a = Number(String(a).replace(replaceNonNumeric, ""));
        b = Number(String(b).replace(replaceNonNumeric, ""));
        return compareBasic(a, b);
      }
      function compareBasic(a, b) {
        return a === b ? 0 : a > b ? 1 : -1;
      }
      function getRowValuesByColumnID(row1, row2, columnId) {
        return [row1.values[columnId], row2.values[columnId]];
      }
      function toString(a) {
        if (typeof a === "number") {
          if (isNaN(a) || a === Infinity || a === -Infinity) {
            return "";
          }
          return String(a);
        }
        if (typeof a === "string") {
          return a;
        }
        return "";
      }
      var sortTypes = Object.freeze({
        __proto__: null,
        alphanumeric,
        datetime,
        basic,
        string,
        number
      });
      actions.resetSortBy = "resetSortBy";
      actions.setSortBy = "setSortBy";
      actions.toggleSortBy = "toggleSortBy";
      actions.clearSortBy = "clearSortBy";
      defaultColumn.sortType = "alphanumeric";
      defaultColumn.sortDescFirst = false;
      var useSortBy = function useSortBy2(hooks) {
        hooks.getSortByToggleProps = [defaultGetSortByToggleProps];
        hooks.stateReducers.push(reducer$5);
        hooks.useInstance.push(useInstance$5);
      };
      useSortBy.pluginName = "useSortBy";
      var defaultGetSortByToggleProps = function defaultGetSortByToggleProps2(props, _ref) {
        var instance = _ref.instance, column = _ref.column;
        var _instance$isMultiSort = instance.isMultiSortEvent, isMultiSortEvent = _instance$isMultiSort === void 0 ? function(e) {
          return e.shiftKey;
        } : _instance$isMultiSort;
        return [props, {
          onClick: column.canSort ? function(e) {
            e.persist();
            column.toggleSortBy(void 0, !instance.disableMultiSort && isMultiSortEvent(e));
          } : void 0,
          style: {
            cursor: column.canSort ? "pointer" : void 0
          },
          title: column.canSort ? "Toggle SortBy" : void 0
        }];
      };
      function reducer$5(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            sortBy: []
          }, state);
        }
        if (action.type === actions.resetSortBy) {
          return _extends({}, state, {
            sortBy: instance.initialState.sortBy || []
          });
        }
        if (action.type === actions.clearSortBy) {
          var sortBy = state.sortBy;
          var newSortBy = sortBy.filter(function(d) {
            return d.id !== action.columnId;
          });
          return _extends({}, state, {
            sortBy: newSortBy
          });
        }
        if (action.type === actions.setSortBy) {
          var _sortBy = action.sortBy;
          return _extends({}, state, {
            sortBy: _sortBy
          });
        }
        if (action.type === actions.toggleSortBy) {
          var columnId = action.columnId, desc = action.desc, multi = action.multi;
          var allColumns2 = instance.allColumns, disableMultiSort = instance.disableMultiSort, disableSortRemove = instance.disableSortRemove, disableMultiRemove = instance.disableMultiRemove, _instance$maxMultiSor = instance.maxMultiSortColCount, maxMultiSortColCount = _instance$maxMultiSor === void 0 ? Number.MAX_SAFE_INTEGER : _instance$maxMultiSor;
          var _sortBy2 = state.sortBy;
          var column = allColumns2.find(function(d) {
            return d.id === columnId;
          });
          var sortDescFirst = column.sortDescFirst;
          var existingSortBy = _sortBy2.find(function(d) {
            return d.id === columnId;
          });
          var existingIndex = _sortBy2.findIndex(function(d) {
            return d.id === columnId;
          });
          var hasDescDefined = typeof desc !== "undefined" && desc !== null;
          var _newSortBy = [];
          var sortAction;
          if (!disableMultiSort && multi) {
            if (existingSortBy) {
              sortAction = "toggle";
            } else {
              sortAction = "add";
            }
          } else {
            if (existingIndex !== _sortBy2.length - 1 || _sortBy2.length !== 1) {
              sortAction = "replace";
            } else if (existingSortBy) {
              sortAction = "toggle";
            } else {
              sortAction = "replace";
            }
          }
          if (sortAction === "toggle" && // Must be toggling
          !disableSortRemove && // If disableSortRemove, disable in general
          !hasDescDefined && // Must not be setting desc
          (multi ? !disableMultiRemove : true) && // If multi, don't allow if disableMultiRemove
          (existingSortBy && // Finally, detect if it should indeed be removed
          existingSortBy.desc && !sortDescFirst || !existingSortBy.desc && sortDescFirst)) {
            sortAction = "remove";
          }
          if (sortAction === "replace") {
            _newSortBy = [{
              id: columnId,
              desc: hasDescDefined ? desc : sortDescFirst
            }];
          } else if (sortAction === "add") {
            _newSortBy = [].concat(_sortBy2, [{
              id: columnId,
              desc: hasDescDefined ? desc : sortDescFirst
            }]);
            _newSortBy.splice(0, _newSortBy.length - maxMultiSortColCount);
          } else if (sortAction === "toggle") {
            _newSortBy = _sortBy2.map(function(d) {
              if (d.id === columnId) {
                return _extends({}, d, {
                  desc: hasDescDefined ? desc : !existingSortBy.desc
                });
              }
              return d;
            });
          } else if (sortAction === "remove") {
            _newSortBy = _sortBy2.filter(function(d) {
              return d.id !== columnId;
            });
          }
          return _extends({}, state, {
            sortBy: _newSortBy
          });
        }
      }
      function useInstance$5(instance) {
        var data = instance.data, rows = instance.rows, flatRows = instance.flatRows, allColumns2 = instance.allColumns, _instance$orderByFn = instance.orderByFn, orderByFn = _instance$orderByFn === void 0 ? defaultOrderByFn : _instance$orderByFn, userSortTypes = instance.sortTypes, manualSortBy = instance.manualSortBy, defaultCanSort = instance.defaultCanSort, disableSortBy = instance.disableSortBy, flatHeaders = instance.flatHeaders, sortBy = instance.state.sortBy, dispatch = instance.dispatch, plugins = instance.plugins, getHooks = instance.getHooks, _instance$autoResetSo = instance.autoResetSortBy, autoResetSortBy = _instance$autoResetSo === void 0 ? true : _instance$autoResetSo;
        ensurePluginOrder(plugins, ["useFilters", "useGlobalFilter", "useGroupBy", "usePivotColumns"], "useSortBy");
        var setSortBy = React.useCallback(function(sortBy2) {
          dispatch({
            type: actions.setSortBy,
            sortBy: sortBy2
          });
        }, [dispatch]);
        var toggleSortBy = React.useCallback(function(columnId, desc, multi) {
          dispatch({
            type: actions.toggleSortBy,
            columnId,
            desc,
            multi
          });
        }, [dispatch]);
        var getInstance = useGetLatest(instance);
        flatHeaders.forEach(function(column) {
          var accessor = column.accessor, defaultColumnCanSort = column.canSort, columnDisableSortBy = column.disableSortBy, id = column.id;
          var canSort = accessor ? getFirstDefined(columnDisableSortBy === true ? false : void 0, disableSortBy === true ? false : void 0, true) : getFirstDefined(defaultCanSort, defaultColumnCanSort, false);
          column.canSort = canSort;
          if (column.canSort) {
            column.toggleSortBy = function(desc, multi) {
              return toggleSortBy(column.id, desc, multi);
            };
            column.clearSortBy = function() {
              dispatch({
                type: actions.clearSortBy,
                columnId: column.id
              });
            };
          }
          column.getSortByToggleProps = makePropGetter(getHooks().getSortByToggleProps, {
            instance: getInstance(),
            column
          });
          var columnSort = sortBy.find(function(d) {
            return d.id === id;
          });
          column.isSorted = !!columnSort;
          column.sortedIndex = sortBy.findIndex(function(d) {
            return d.id === id;
          });
          column.isSortedDesc = column.isSorted ? columnSort.desc : void 0;
        });
        var _React$useMemo = React.useMemo(function() {
          if (manualSortBy || !sortBy.length) {
            return [rows, flatRows];
          }
          var sortedFlatRows2 = [];
          var availableSortBy = sortBy.filter(function(sort) {
            return allColumns2.find(function(col) {
              return col.id === sort.id;
            });
          });
          var sortData = function sortData2(rows2) {
            var sortedData = orderByFn(
              rows2,
              availableSortBy.map(function(sort) {
                var column = allColumns2.find(function(d) {
                  return d.id === sort.id;
                });
                if (!column) {
                  throw new Error("React-Table: Could not find a column with id: " + sort.id + " while sorting");
                }
                var sortType = column.sortType;
                var sortMethod = isFunction(sortType) || (userSortTypes || {})[sortType] || sortTypes[sortType];
                if (!sortMethod) {
                  throw new Error("React-Table: Could not find a valid sortType of '" + sortType + "' for column '" + sort.id + "'.");
                }
                return function(a, b) {
                  return sortMethod(a, b, sort.id, sort.desc);
                };
              }),
              // Map the directions
              availableSortBy.map(function(sort) {
                var column = allColumns2.find(function(d) {
                  return d.id === sort.id;
                });
                if (column && column.sortInverted) {
                  return sort.desc;
                }
                return !sort.desc;
              })
            );
            sortedData.forEach(function(row) {
              sortedFlatRows2.push(row);
              if (!row.subRows || row.subRows.length === 0) {
                return;
              }
              row.subRows = sortData2(row.subRows);
            });
            return sortedData;
          };
          return [sortData(rows), sortedFlatRows2];
        }, [manualSortBy, sortBy, rows, flatRows, allColumns2, orderByFn, userSortTypes]), sortedRows = _React$useMemo[0], sortedFlatRows = _React$useMemo[1];
        var getAutoResetSortBy = useGetLatest(autoResetSortBy);
        useMountedLayoutEffect(function() {
          if (getAutoResetSortBy()) {
            dispatch({
              type: actions.resetSortBy
            });
          }
        }, [manualSortBy ? null : data]);
        Object.assign(instance, {
          preSortedRows: rows,
          preSortedFlatRows: flatRows,
          sortedRows,
          sortedFlatRows,
          rows: sortedRows,
          flatRows: sortedFlatRows,
          setSortBy,
          toggleSortBy
        });
      }
      function defaultOrderByFn(arr, funcs, dirs) {
        return [].concat(arr).sort(function(rowA, rowB) {
          for (var i = 0; i < funcs.length; i += 1) {
            var sortFn = funcs[i];
            var desc = dirs[i] === false || dirs[i] === "desc";
            var sortInt = sortFn(rowA, rowB);
            if (sortInt !== 0) {
              return desc ? -sortInt : sortInt;
            }
          }
          return dirs[0] ? rowA.index - rowB.index : rowB.index - rowA.index;
        });
      }
      var pluginName = "usePagination";
      actions.resetPage = "resetPage";
      actions.gotoPage = "gotoPage";
      actions.setPageSize = "setPageSize";
      var usePagination = function usePagination2(hooks) {
        hooks.stateReducers.push(reducer$6);
        hooks.useInstance.push(useInstance$6);
      };
      usePagination.pluginName = pluginName;
      function reducer$6(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            pageSize: 10,
            pageIndex: 0
          }, state);
        }
        if (action.type === actions.resetPage) {
          return _extends({}, state, {
            pageIndex: instance.initialState.pageIndex || 0
          });
        }
        if (action.type === actions.gotoPage) {
          var pageCount = instance.pageCount, page = instance.page;
          var newPageIndex = functionalUpdate(action.pageIndex, state.pageIndex);
          var canNavigate = false;
          if (newPageIndex > state.pageIndex) {
            canNavigate = pageCount === -1 ? page.length >= state.pageSize : newPageIndex < pageCount;
          } else if (newPageIndex < state.pageIndex) {
            canNavigate = newPageIndex > -1;
          }
          if (!canNavigate) {
            return state;
          }
          return _extends({}, state, {
            pageIndex: newPageIndex
          });
        }
        if (action.type === actions.setPageSize) {
          var pageSize = action.pageSize;
          var topRowIndex = state.pageSize * state.pageIndex;
          var pageIndex = Math.floor(topRowIndex / pageSize);
          return _extends({}, state, {
            pageIndex,
            pageSize
          });
        }
      }
      function useInstance$6(instance) {
        var rows = instance.rows, _instance$autoResetPa = instance.autoResetPage, autoResetPage = _instance$autoResetPa === void 0 ? true : _instance$autoResetPa, _instance$manualExpan = instance.manualExpandedKey, manualExpandedKey = _instance$manualExpan === void 0 ? "expanded" : _instance$manualExpan, plugins = instance.plugins, userPageCount = instance.pageCount, _instance$paginateExp = instance.paginateExpandedRows, paginateExpandedRows = _instance$paginateExp === void 0 ? true : _instance$paginateExp, _instance$expandSubRo = instance.expandSubRows, expandSubRows = _instance$expandSubRo === void 0 ? true : _instance$expandSubRo, _instance$state = instance.state, pageSize = _instance$state.pageSize, pageIndex = _instance$state.pageIndex, expanded = _instance$state.expanded, globalFilter = _instance$state.globalFilter, filters = _instance$state.filters, groupBy = _instance$state.groupBy, sortBy = _instance$state.sortBy, dispatch = instance.dispatch, data = instance.data, manualPagination = instance.manualPagination;
        ensurePluginOrder(plugins, ["useGlobalFilter", "useFilters", "useGroupBy", "useSortBy", "useExpanded"], "usePagination");
        var getAutoResetPage = useGetLatest(autoResetPage);
        useMountedLayoutEffect(function() {
          if (getAutoResetPage()) {
            dispatch({
              type: actions.resetPage
            });
          }
        }, [dispatch, manualPagination ? null : data, globalFilter, filters, groupBy, sortBy]);
        var pageCount = manualPagination ? userPageCount : Math.ceil(rows.length / pageSize);
        var pageOptions = React.useMemo(function() {
          return pageCount > 0 ? [].concat(new Array(pageCount)).fill(null).map(function(d, i) {
            return i;
          }) : [];
        }, [pageCount]);
        var page = React.useMemo(function() {
          var page2;
          if (manualPagination) {
            page2 = rows;
          } else {
            var pageStart = pageSize * pageIndex;
            var pageEnd = pageStart + pageSize;
            page2 = rows.slice(pageStart, pageEnd);
          }
          if (paginateExpandedRows) {
            return page2;
          }
          return expandRows(page2, {
            manualExpandedKey,
            expanded,
            expandSubRows
          });
        }, [expandSubRows, expanded, manualExpandedKey, manualPagination, pageIndex, pageSize, paginateExpandedRows, rows]);
        var canPreviousPage = pageIndex > 0;
        var canNextPage = pageCount === -1 ? page.length >= pageSize : pageIndex < pageCount - 1;
        var gotoPage = React.useCallback(function(pageIndex2) {
          dispatch({
            type: actions.gotoPage,
            pageIndex: pageIndex2
          });
        }, [dispatch]);
        var previousPage = React.useCallback(function() {
          return gotoPage(function(old) {
            return old - 1;
          });
        }, [gotoPage]);
        var nextPage = React.useCallback(function() {
          return gotoPage(function(old) {
            return old + 1;
          });
        }, [gotoPage]);
        var setPageSize = React.useCallback(function(pageSize2) {
          dispatch({
            type: actions.setPageSize,
            pageSize: pageSize2
          });
        }, [dispatch]);
        Object.assign(instance, {
          pageOptions,
          pageCount,
          page,
          canPreviousPage,
          canNextPage,
          gotoPage,
          previousPage,
          nextPage,
          setPageSize
        });
      }
      actions.resetPivot = "resetPivot";
      actions.togglePivot = "togglePivot";
      var _UNSTABLE_usePivotColumns = function _UNSTABLE_usePivotColumns2(hooks) {
        hooks.getPivotToggleProps = [defaultGetPivotToggleProps];
        hooks.stateReducers.push(reducer$7);
        hooks.useInstanceAfterData.push(useInstanceAfterData);
        hooks.allColumns.push(allColumns);
        hooks.accessValue.push(accessValue);
        hooks.materializedColumns.push(materializedColumns);
        hooks.materializedColumnsDeps.push(materializedColumnsDeps);
        hooks.visibleColumns.push(visibleColumns$1);
        hooks.visibleColumnsDeps.push(visibleColumnsDeps);
        hooks.useInstance.push(useInstance$7);
        hooks.prepareRow.push(prepareRow$2);
      };
      _UNSTABLE_usePivotColumns.pluginName = "usePivotColumns";
      var defaultPivotColumns = [];
      var defaultGetPivotToggleProps = function defaultGetPivotToggleProps2(props, _ref) {
        var header = _ref.header;
        return [props, {
          onClick: header.canPivot ? function(e) {
            e.persist();
            header.togglePivot();
          } : void 0,
          style: {
            cursor: header.canPivot ? "pointer" : void 0
          },
          title: "Toggle Pivot"
        }];
      };
      function reducer$7(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            pivotColumns: defaultPivotColumns
          }, state);
        }
        if (action.type === actions.resetPivot) {
          return _extends({}, state, {
            pivotColumns: instance.initialState.pivotColumns || defaultPivotColumns
          });
        }
        if (action.type === actions.togglePivot) {
          var columnId = action.columnId, setPivot = action.value;
          var resolvedPivot = typeof setPivot !== "undefined" ? setPivot : !state.pivotColumns.includes(columnId);
          if (resolvedPivot) {
            return _extends({}, state, {
              pivotColumns: [].concat(state.pivotColumns, [columnId])
            });
          }
          return _extends({}, state, {
            pivotColumns: state.pivotColumns.filter(function(d) {
              return d !== columnId;
            })
          });
        }
      }
      function useInstanceAfterData(instance) {
        instance.allColumns.forEach(function(column) {
          column.isPivotSource = instance.state.pivotColumns.includes(column.id);
        });
      }
      function allColumns(columns, _ref2) {
        var instance = _ref2.instance;
        columns.forEach(function(column) {
          column.isPivotSource = instance.state.pivotColumns.includes(column.id);
          column.uniqueValues = /* @__PURE__ */ new Set();
        });
        return columns;
      }
      function accessValue(value, _ref3) {
        var column = _ref3.column;
        if (column.uniqueValues && typeof value !== "undefined") {
          column.uniqueValues.add(value);
        }
        return value;
      }
      function materializedColumns(materialized, _ref4) {
        var instance = _ref4.instance;
        var allColumns2 = instance.allColumns, state = instance.state;
        if (!state.pivotColumns.length || !state.groupBy || !state.groupBy.length) {
          return materialized;
        }
        var pivotColumns = state.pivotColumns.map(function(id) {
          return allColumns2.find(function(d) {
            return d.id === id;
          });
        }).filter(Boolean);
        var sourceColumns = allColumns2.filter(function(d) {
          return !d.isPivotSource && !state.groupBy.includes(d.id) && !state.pivotColumns.includes(d.id);
        });
        var buildPivotColumns = function buildPivotColumns2(depth, parent, pivotFilters) {
          if (depth === void 0) {
            depth = 0;
          }
          if (pivotFilters === void 0) {
            pivotFilters = [];
          }
          var pivotColumn = pivotColumns[depth];
          if (!pivotColumn) {
            return sourceColumns.map(function(sourceColumn) {
              return _extends({}, sourceColumn, {
                canPivot: false,
                isPivoted: true,
                parent,
                depth,
                id: "" + (parent ? parent.id + "." + sourceColumn.id : sourceColumn.id),
                accessor: function accessor(originalRow, i, row) {
                  if (pivotFilters.every(function(filter) {
                    return filter(row);
                  })) {
                    return row.values[sourceColumn.id];
                  }
                }
              });
            });
          }
          var uniqueValues = Array.from(pivotColumn.uniqueValues).sort();
          return uniqueValues.map(function(uniqueValue) {
            var columnGroup = _extends({}, pivotColumn, {
              Header: pivotColumn.PivotHeader || typeof pivotColumn.header === "string" ? pivotColumn.Header + ": " + uniqueValue : uniqueValue,
              isPivotGroup: true,
              parent,
              depth,
              id: parent ? parent.id + "." + pivotColumn.id + "." + uniqueValue : pivotColumn.id + "." + uniqueValue,
              pivotValue: uniqueValue
            });
            columnGroup.columns = buildPivotColumns2(depth + 1, columnGroup, [].concat(pivotFilters, [function(row) {
              return row.values[pivotColumn.id] === uniqueValue;
            }]));
            return columnGroup;
          });
        };
        var newMaterialized = flattenColumns(buildPivotColumns());
        return [].concat(materialized, newMaterialized);
      }
      function materializedColumnsDeps(deps, _ref5) {
        var _ref5$instance$state = _ref5.instance.state, pivotColumns = _ref5$instance$state.pivotColumns, groupBy = _ref5$instance$state.groupBy;
        return [].concat(deps, [pivotColumns, groupBy]);
      }
      function visibleColumns$1(visibleColumns2, _ref6) {
        var state = _ref6.instance.state;
        visibleColumns2 = visibleColumns2.filter(function(d) {
          return !d.isPivotSource;
        });
        if (state.pivotColumns.length && state.groupBy && state.groupBy.length) {
          visibleColumns2 = visibleColumns2.filter(function(column) {
            return column.isGrouped || column.isPivoted;
          });
        }
        return visibleColumns2;
      }
      function visibleColumnsDeps(deps, _ref7) {
        var instance = _ref7.instance;
        return [].concat(deps, [instance.state.pivotColumns, instance.state.groupBy]);
      }
      function useInstance$7(instance) {
        var columns = instance.columns, allColumns2 = instance.allColumns, flatHeaders = instance.flatHeaders, getHooks = instance.getHooks, plugins = instance.plugins, dispatch = instance.dispatch, _instance$autoResetPi = instance.autoResetPivot, autoResetPivot = _instance$autoResetPi === void 0 ? true : _instance$autoResetPi, manaulPivot = instance.manaulPivot, disablePivot = instance.disablePivot, defaultCanPivot = instance.defaultCanPivot;
        ensurePluginOrder(plugins, ["useGroupBy"], "usePivotColumns");
        var getInstance = useGetLatest(instance);
        allColumns2.forEach(function(column) {
          var accessor = column.accessor, defaultColumnPivot = column.defaultPivot, columnDisablePivot = column.disablePivot;
          column.canPivot = accessor ? getFirstDefined(column.canPivot, columnDisablePivot === true ? false : void 0, disablePivot === true ? false : void 0, true) : getFirstDefined(column.canPivot, defaultColumnPivot, defaultCanPivot, false);
          if (column.canPivot) {
            column.togglePivot = function() {
              return instance.togglePivot(column.id);
            };
          }
          column.Aggregated = column.Aggregated || column.Cell;
        });
        var togglePivot = function togglePivot2(columnId, value) {
          dispatch({
            type: actions.togglePivot,
            columnId,
            value
          });
        };
        flatHeaders.forEach(function(header) {
          header.getPivotToggleProps = makePropGetter(getHooks().getPivotToggleProps, {
            instance: getInstance(),
            header
          });
        });
        var getAutoResetPivot = useGetLatest(autoResetPivot);
        useMountedLayoutEffect(function() {
          if (getAutoResetPivot()) {
            dispatch({
              type: actions.resetPivot
            });
          }
        }, [dispatch, manaulPivot ? null : columns]);
        Object.assign(instance, {
          togglePivot
        });
      }
      function prepareRow$2(row) {
        row.allCells.forEach(function(cell) {
          cell.isPivoted = cell.column.isPivoted;
        });
      }
      var pluginName$1 = "useRowSelect";
      actions.resetSelectedRows = "resetSelectedRows";
      actions.toggleAllRowsSelected = "toggleAllRowsSelected";
      actions.toggleRowSelected = "toggleRowSelected";
      actions.toggleAllPageRowsSelected = "toggleAllPageRowsSelected";
      var useRowSelect = function useRowSelect2(hooks) {
        hooks.getToggleRowSelectedProps = [defaultGetToggleRowSelectedProps];
        hooks.getToggleAllRowsSelectedProps = [defaultGetToggleAllRowsSelectedProps];
        hooks.getToggleAllPageRowsSelectedProps = [defaultGetToggleAllPageRowsSelectedProps];
        hooks.stateReducers.push(reducer$8);
        hooks.useInstance.push(useInstance$8);
        hooks.prepareRow.push(prepareRow$3);
      };
      useRowSelect.pluginName = pluginName$1;
      var defaultGetToggleRowSelectedProps = function defaultGetToggleRowSelectedProps2(props, _ref) {
        var instance = _ref.instance, row = _ref.row;
        var _instance$manualRowSe = instance.manualRowSelectedKey, manualRowSelectedKey = _instance$manualRowSe === void 0 ? "isSelected" : _instance$manualRowSe;
        var checked = false;
        if (row.original && row.original[manualRowSelectedKey]) {
          checked = true;
        } else {
          checked = row.isSelected;
        }
        return [props, {
          onChange: function onChange(e) {
            row.toggleRowSelected(e.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked,
          title: "Toggle Row Selected",
          indeterminate: row.isSomeSelected
        }];
      };
      var defaultGetToggleAllRowsSelectedProps = function defaultGetToggleAllRowsSelectedProps2(props, _ref2) {
        var instance = _ref2.instance;
        return [props, {
          onChange: function onChange(e) {
            instance.toggleAllRowsSelected(e.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: instance.isAllRowsSelected,
          title: "Toggle All Rows Selected",
          indeterminate: Boolean(!instance.isAllRowsSelected && Object.keys(instance.state.selectedRowIds).length)
        }];
      };
      var defaultGetToggleAllPageRowsSelectedProps = function defaultGetToggleAllPageRowsSelectedProps2(props, _ref3) {
        var instance = _ref3.instance;
        return [props, {
          onChange: function onChange(e) {
            instance.toggleAllPageRowsSelected(e.target.checked);
          },
          style: {
            cursor: "pointer"
          },
          checked: instance.isAllPageRowsSelected,
          title: "Toggle All Current Page Rows Selected",
          indeterminate: Boolean(!instance.isAllPageRowsSelected && instance.page.some(function(_ref4) {
            var id = _ref4.id;
            return instance.state.selectedRowIds[id];
          }))
        }];
      };
      function reducer$8(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            selectedRowIds: {}
          }, state);
        }
        if (action.type === actions.resetSelectedRows) {
          return _extends({}, state, {
            selectedRowIds: instance.initialState.selectedRowIds || {}
          });
        }
        if (action.type === actions.toggleAllRowsSelected) {
          var setSelected = action.value;
          var isAllRowsSelected = instance.isAllRowsSelected, rowsById = instance.rowsById, _instance$nonGroupedR = instance.nonGroupedRowsById, nonGroupedRowsById = _instance$nonGroupedR === void 0 ? rowsById : _instance$nonGroupedR;
          var selectAll = typeof setSelected !== "undefined" ? setSelected : !isAllRowsSelected;
          var selectedRowIds = Object.assign({}, state.selectedRowIds);
          if (selectAll) {
            Object.keys(nonGroupedRowsById).forEach(function(rowId) {
              selectedRowIds[rowId] = true;
            });
          } else {
            Object.keys(nonGroupedRowsById).forEach(function(rowId) {
              delete selectedRowIds[rowId];
            });
          }
          return _extends({}, state, {
            selectedRowIds
          });
        }
        if (action.type === actions.toggleRowSelected) {
          var id = action.id, _setSelected = action.value;
          var _rowsById = instance.rowsById, _instance$selectSubRo = instance.selectSubRows, selectSubRows = _instance$selectSubRo === void 0 ? true : _instance$selectSubRo, getSubRows = instance.getSubRows;
          var isSelected = state.selectedRowIds[id];
          var shouldExist = typeof _setSelected !== "undefined" ? _setSelected : !isSelected;
          if (isSelected === shouldExist) {
            return state;
          }
          var newSelectedRowIds = _extends({}, state.selectedRowIds);
          var handleRowById = function handleRowById2(id2) {
            var row = _rowsById[id2];
            if (row) {
              if (!row.isGrouped) {
                if (shouldExist) {
                  newSelectedRowIds[id2] = true;
                } else {
                  delete newSelectedRowIds[id2];
                }
              }
              if (selectSubRows && getSubRows(row)) {
                return getSubRows(row).forEach(function(row2) {
                  return handleRowById2(row2.id);
                });
              }
            }
          };
          handleRowById(id);
          return _extends({}, state, {
            selectedRowIds: newSelectedRowIds
          });
        }
        if (action.type === actions.toggleAllPageRowsSelected) {
          var _setSelected2 = action.value;
          var page = instance.page, _rowsById2 = instance.rowsById, _instance$selectSubRo2 = instance.selectSubRows, _selectSubRows = _instance$selectSubRo2 === void 0 ? true : _instance$selectSubRo2, isAllPageRowsSelected = instance.isAllPageRowsSelected, _getSubRows = instance.getSubRows;
          var _selectAll = typeof _setSelected2 !== "undefined" ? _setSelected2 : !isAllPageRowsSelected;
          var _newSelectedRowIds = _extends({}, state.selectedRowIds);
          var _handleRowById = function _handleRowById2(id2) {
            var row = _rowsById2[id2];
            if (!row.isGrouped) {
              if (_selectAll) {
                _newSelectedRowIds[id2] = true;
              } else {
                delete _newSelectedRowIds[id2];
              }
            }
            if (_selectSubRows && _getSubRows(row)) {
              return _getSubRows(row).forEach(function(row2) {
                return _handleRowById2(row2.id);
              });
            }
          };
          page.forEach(function(row) {
            return _handleRowById(row.id);
          });
          return _extends({}, state, {
            selectedRowIds: _newSelectedRowIds
          });
        }
        return state;
      }
      function useInstance$8(instance) {
        var data = instance.data, rows = instance.rows, getHooks = instance.getHooks, plugins = instance.plugins, rowsById = instance.rowsById, _instance$nonGroupedR2 = instance.nonGroupedRowsById, nonGroupedRowsById = _instance$nonGroupedR2 === void 0 ? rowsById : _instance$nonGroupedR2, _instance$autoResetSe = instance.autoResetSelectedRows, autoResetSelectedRows = _instance$autoResetSe === void 0 ? true : _instance$autoResetSe, selectedRowIds = instance.state.selectedRowIds, _instance$selectSubRo3 = instance.selectSubRows, selectSubRows = _instance$selectSubRo3 === void 0 ? true : _instance$selectSubRo3, dispatch = instance.dispatch, page = instance.page, getSubRows = instance.getSubRows;
        ensurePluginOrder(plugins, ["useFilters", "useGroupBy", "useSortBy", "useExpanded", "usePagination"], "useRowSelect");
        var selectedFlatRows = React.useMemo(function() {
          var selectedFlatRows2 = [];
          rows.forEach(function(row) {
            var isSelected = selectSubRows ? getRowIsSelected(row, selectedRowIds, getSubRows) : !!selectedRowIds[row.id];
            row.isSelected = !!isSelected;
            row.isSomeSelected = isSelected === null;
            if (isSelected) {
              selectedFlatRows2.push(row);
            }
          });
          return selectedFlatRows2;
        }, [rows, selectSubRows, selectedRowIds, getSubRows]);
        var isAllRowsSelected = Boolean(Object.keys(nonGroupedRowsById).length && Object.keys(selectedRowIds).length);
        var isAllPageRowsSelected = isAllRowsSelected;
        if (isAllRowsSelected) {
          if (Object.keys(nonGroupedRowsById).some(function(id) {
            return !selectedRowIds[id];
          })) {
            isAllRowsSelected = false;
          }
        }
        if (!isAllRowsSelected) {
          if (page && page.length && page.some(function(_ref5) {
            var id = _ref5.id;
            return !selectedRowIds[id];
          })) {
            isAllPageRowsSelected = false;
          }
        }
        var getAutoResetSelectedRows = useGetLatest(autoResetSelectedRows);
        useMountedLayoutEffect(function() {
          if (getAutoResetSelectedRows()) {
            dispatch({
              type: actions.resetSelectedRows
            });
          }
        }, [dispatch, data]);
        var toggleAllRowsSelected = React.useCallback(function(value) {
          return dispatch({
            type: actions.toggleAllRowsSelected,
            value
          });
        }, [dispatch]);
        var toggleAllPageRowsSelected = React.useCallback(function(value) {
          return dispatch({
            type: actions.toggleAllPageRowsSelected,
            value
          });
        }, [dispatch]);
        var toggleRowSelected = React.useCallback(function(id, value) {
          return dispatch({
            type: actions.toggleRowSelected,
            id,
            value
          });
        }, [dispatch]);
        var getInstance = useGetLatest(instance);
        var getToggleAllRowsSelectedProps = makePropGetter(getHooks().getToggleAllRowsSelectedProps, {
          instance: getInstance()
        });
        var getToggleAllPageRowsSelectedProps = makePropGetter(getHooks().getToggleAllPageRowsSelectedProps, {
          instance: getInstance()
        });
        Object.assign(instance, {
          selectedFlatRows,
          isAllRowsSelected,
          isAllPageRowsSelected,
          toggleRowSelected,
          toggleAllRowsSelected,
          getToggleAllRowsSelectedProps,
          getToggleAllPageRowsSelectedProps,
          toggleAllPageRowsSelected
        });
      }
      function prepareRow$3(row, _ref6) {
        var instance = _ref6.instance;
        row.toggleRowSelected = function(set) {
          return instance.toggleRowSelected(row.id, set);
        };
        row.getToggleRowSelectedProps = makePropGetter(instance.getHooks().getToggleRowSelectedProps, {
          instance,
          row
        });
      }
      function getRowIsSelected(row, selectedRowIds, getSubRows) {
        if (selectedRowIds[row.id]) {
          return true;
        }
        var subRows = getSubRows(row);
        if (subRows && subRows.length) {
          var allChildrenSelected = true;
          var someSelected = false;
          subRows.forEach(function(subRow) {
            if (someSelected && !allChildrenSelected) {
              return;
            }
            if (getRowIsSelected(subRow, selectedRowIds, getSubRows)) {
              someSelected = true;
            } else {
              allChildrenSelected = false;
            }
          });
          return allChildrenSelected ? true : someSelected ? null : false;
        }
        return false;
      }
      var defaultInitialRowStateAccessor = function defaultInitialRowStateAccessor2(row) {
        return {};
      };
      var defaultInitialCellStateAccessor = function defaultInitialCellStateAccessor2(cell) {
        return {};
      };
      actions.setRowState = "setRowState";
      actions.setCellState = "setCellState";
      actions.resetRowState = "resetRowState";
      var useRowState = function useRowState2(hooks) {
        hooks.stateReducers.push(reducer$9);
        hooks.useInstance.push(useInstance$9);
        hooks.prepareRow.push(prepareRow$4);
      };
      useRowState.pluginName = "useRowState";
      function reducer$9(state, action, previousState, instance) {
        var _instance$initialRowS = instance.initialRowStateAccessor, initialRowStateAccessor = _instance$initialRowS === void 0 ? defaultInitialRowStateAccessor : _instance$initialRowS, _instance$initialCell = instance.initialCellStateAccessor, initialCellStateAccessor = _instance$initialCell === void 0 ? defaultInitialCellStateAccessor : _instance$initialCell, rowsById = instance.rowsById;
        if (action.type === actions.init) {
          return _extends({
            rowState: {}
          }, state);
        }
        if (action.type === actions.resetRowState) {
          return _extends({}, state, {
            rowState: instance.initialState.rowState || {}
          });
        }
        if (action.type === actions.setRowState) {
          var _extends2;
          var rowId = action.rowId, value = action.value;
          var oldRowState = typeof state.rowState[rowId] !== "undefined" ? state.rowState[rowId] : initialRowStateAccessor(rowsById[rowId]);
          return _extends({}, state, {
            rowState: _extends({}, state.rowState, (_extends2 = {}, _extends2[rowId] = functionalUpdate(value, oldRowState), _extends2))
          });
        }
        if (action.type === actions.setCellState) {
          var _oldRowState$cellStat, _rowsById$_rowId, _rowsById$_rowId$cell, _extends3, _extends4;
          var _rowId = action.rowId, columnId = action.columnId, _value = action.value;
          var _oldRowState = typeof state.rowState[_rowId] !== "undefined" ? state.rowState[_rowId] : initialRowStateAccessor(rowsById[_rowId]);
          var oldCellState = typeof (_oldRowState == null ? void 0 : (_oldRowState$cellStat = _oldRowState.cellState) == null ? void 0 : _oldRowState$cellStat[columnId]) !== "undefined" ? _oldRowState.cellState[columnId] : initialCellStateAccessor((_rowsById$_rowId = rowsById[_rowId]) == null ? void 0 : (_rowsById$_rowId$cell = _rowsById$_rowId.cells) == null ? void 0 : _rowsById$_rowId$cell.find(function(cell) {
            return cell.column.id === columnId;
          }));
          return _extends({}, state, {
            rowState: _extends({}, state.rowState, (_extends4 = {}, _extends4[_rowId] = _extends({}, _oldRowState, {
              cellState: _extends({}, _oldRowState.cellState || {}, (_extends3 = {}, _extends3[columnId] = functionalUpdate(_value, oldCellState), _extends3))
            }), _extends4))
          });
        }
      }
      function useInstance$9(instance) {
        var _instance$autoResetRo = instance.autoResetRowState, autoResetRowState = _instance$autoResetRo === void 0 ? true : _instance$autoResetRo, data = instance.data, dispatch = instance.dispatch;
        var setRowState = React.useCallback(function(rowId, value) {
          return dispatch({
            type: actions.setRowState,
            rowId,
            value
          });
        }, [dispatch]);
        var setCellState = React.useCallback(function(rowId, columnId, value) {
          return dispatch({
            type: actions.setCellState,
            rowId,
            columnId,
            value
          });
        }, [dispatch]);
        var getAutoResetRowState = useGetLatest(autoResetRowState);
        useMountedLayoutEffect(function() {
          if (getAutoResetRowState()) {
            dispatch({
              type: actions.resetRowState
            });
          }
        }, [data]);
        Object.assign(instance, {
          setRowState,
          setCellState
        });
      }
      function prepareRow$4(row, _ref) {
        var instance = _ref.instance;
        var _instance$initialRowS2 = instance.initialRowStateAccessor, initialRowStateAccessor = _instance$initialRowS2 === void 0 ? defaultInitialRowStateAccessor : _instance$initialRowS2, _instance$initialCell2 = instance.initialCellStateAccessor, initialCellStateAccessor = _instance$initialCell2 === void 0 ? defaultInitialCellStateAccessor : _instance$initialCell2, rowState = instance.state.rowState;
        if (row) {
          row.state = typeof rowState[row.id] !== "undefined" ? rowState[row.id] : initialRowStateAccessor(row);
          row.setState = function(updater) {
            return instance.setRowState(row.id, updater);
          };
          row.cells.forEach(function(cell) {
            if (!row.state.cellState) {
              row.state.cellState = {};
            }
            cell.state = typeof row.state.cellState[cell.column.id] !== "undefined" ? row.state.cellState[cell.column.id] : initialCellStateAccessor(cell);
            cell.setState = function(updater) {
              return instance.setCellState(row.id, cell.column.id, updater);
            };
          });
        }
      }
      actions.resetColumnOrder = "resetColumnOrder";
      actions.setColumnOrder = "setColumnOrder";
      var useColumnOrder = function useColumnOrder2(hooks) {
        hooks.stateReducers.push(reducer$a);
        hooks.visibleColumnsDeps.push(function(deps, _ref) {
          var instance = _ref.instance;
          return [].concat(deps, [instance.state.columnOrder]);
        });
        hooks.visibleColumns.push(visibleColumns$2);
        hooks.useInstance.push(useInstance$a);
      };
      useColumnOrder.pluginName = "useColumnOrder";
      function reducer$a(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            columnOrder: []
          }, state);
        }
        if (action.type === actions.resetColumnOrder) {
          return _extends({}, state, {
            columnOrder: instance.initialState.columnOrder || []
          });
        }
        if (action.type === actions.setColumnOrder) {
          return _extends({}, state, {
            columnOrder: functionalUpdate(action.columnOrder, state.columnOrder)
          });
        }
      }
      function visibleColumns$2(columns, _ref2) {
        var columnOrder = _ref2.instance.state.columnOrder;
        if (!columnOrder || !columnOrder.length) {
          return columns;
        }
        var columnOrderCopy = [].concat(columnOrder);
        var columnsCopy = [].concat(columns);
        var columnsInOrder = [];
        var _loop = function _loop2() {
          var targetColumnId = columnOrderCopy.shift();
          var foundIndex = columnsCopy.findIndex(function(d) {
            return d.id === targetColumnId;
          });
          if (foundIndex > -1) {
            columnsInOrder.push(columnsCopy.splice(foundIndex, 1)[0]);
          }
        };
        while (columnsCopy.length && columnOrderCopy.length) {
          _loop();
        }
        return [].concat(columnsInOrder, columnsCopy);
      }
      function useInstance$a(instance) {
        var dispatch = instance.dispatch;
        instance.setColumnOrder = React.useCallback(function(columnOrder) {
          return dispatch({
            type: actions.setColumnOrder,
            columnOrder
          });
        }, [dispatch]);
      }
      defaultColumn.canResize = true;
      actions.columnStartResizing = "columnStartResizing";
      actions.columnResizing = "columnResizing";
      actions.columnDoneResizing = "columnDoneResizing";
      actions.resetResize = "resetResize";
      var useResizeColumns = function useResizeColumns2(hooks) {
        hooks.getResizerProps = [defaultGetResizerProps];
        hooks.getHeaderProps.push({
          style: {
            position: "relative"
          }
        });
        hooks.stateReducers.push(reducer$b);
        hooks.useInstance.push(useInstance$b);
        hooks.useInstanceBeforeDimensions.push(useInstanceBeforeDimensions$1);
      };
      var defaultGetResizerProps = function defaultGetResizerProps2(props, _ref) {
        var instance = _ref.instance, header = _ref.header;
        var dispatch = instance.dispatch;
        var onResizeStart = function onResizeStart2(e, header2) {
          var isTouchEvent = false;
          if (e.type === "touchstart") {
            if (e.touches && e.touches.length > 1) {
              return;
            }
            isTouchEvent = true;
          }
          var headersToResize = getLeafHeaders(header2);
          var headerIdWidths = headersToResize.map(function(d) {
            return [d.id, d.totalWidth];
          });
          var clientX = isTouchEvent ? Math.round(e.touches[0].clientX) : e.clientX;
          var raf;
          var mostRecentClientX;
          var dispatchEnd = function dispatchEnd2() {
            window.cancelAnimationFrame(raf);
            raf = null;
            dispatch({
              type: actions.columnDoneResizing
            });
          };
          var dispatchMove = function dispatchMove2() {
            window.cancelAnimationFrame(raf);
            raf = null;
            dispatch({
              type: actions.columnResizing,
              clientX: mostRecentClientX
            });
          };
          var scheduleDispatchMoveOnNextAnimationFrame = function scheduleDispatchMoveOnNextAnimationFrame2(clientXPos) {
            mostRecentClientX = clientXPos;
            if (!raf) {
              raf = window.requestAnimationFrame(dispatchMove);
            }
          };
          var handlersAndEvents = {
            mouse: {
              moveEvent: "mousemove",
              moveHandler: function moveHandler(e2) {
                return scheduleDispatchMoveOnNextAnimationFrame(e2.clientX);
              },
              upEvent: "mouseup",
              upHandler: function upHandler(e2) {
                document.removeEventListener("mousemove", handlersAndEvents.mouse.moveHandler);
                document.removeEventListener("mouseup", handlersAndEvents.mouse.upHandler);
                dispatchEnd();
              }
            },
            touch: {
              moveEvent: "touchmove",
              moveHandler: function moveHandler(e2) {
                if (e2.cancelable) {
                  e2.preventDefault();
                  e2.stopPropagation();
                }
                scheduleDispatchMoveOnNextAnimationFrame(e2.touches[0].clientX);
                return false;
              },
              upEvent: "touchend",
              upHandler: function upHandler(e2) {
                document.removeEventListener(handlersAndEvents.touch.moveEvent, handlersAndEvents.touch.moveHandler);
                document.removeEventListener(handlersAndEvents.touch.upEvent, handlersAndEvents.touch.moveHandler);
                dispatchEnd();
              }
            }
          };
          var events = isTouchEvent ? handlersAndEvents.touch : handlersAndEvents.mouse;
          var passiveIfSupported = passiveEventSupported() ? {
            passive: false
          } : false;
          document.addEventListener(events.moveEvent, events.moveHandler, passiveIfSupported);
          document.addEventListener(events.upEvent, events.upHandler, passiveIfSupported);
          dispatch({
            type: actions.columnStartResizing,
            columnId: header2.id,
            columnWidth: header2.totalWidth,
            headerIdWidths,
            clientX
          });
        };
        return [props, {
          onMouseDown: function onMouseDown(e) {
            return e.persist() || onResizeStart(e, header);
          },
          onTouchStart: function onTouchStart(e) {
            return e.persist() || onResizeStart(e, header);
          },
          style: {
            cursor: "col-resize"
          },
          draggable: false,
          role: "separator"
        }];
      };
      useResizeColumns.pluginName = "useResizeColumns";
      function reducer$b(state, action) {
        if (action.type === actions.init) {
          return _extends({
            columnResizing: {
              columnWidths: {}
            }
          }, state);
        }
        if (action.type === actions.resetResize) {
          return _extends({}, state, {
            columnResizing: {
              columnWidths: {}
            }
          });
        }
        if (action.type === actions.columnStartResizing) {
          var clientX = action.clientX, columnId = action.columnId, columnWidth = action.columnWidth, headerIdWidths = action.headerIdWidths;
          return _extends({}, state, {
            columnResizing: _extends({}, state.columnResizing, {
              startX: clientX,
              headerIdWidths,
              columnWidth,
              isResizingColumn: columnId
            })
          });
        }
        if (action.type === actions.columnResizing) {
          var _clientX = action.clientX;
          var _state$columnResizing = state.columnResizing, startX = _state$columnResizing.startX, _columnWidth = _state$columnResizing.columnWidth, _state$columnResizing2 = _state$columnResizing.headerIdWidths, _headerIdWidths = _state$columnResizing2 === void 0 ? [] : _state$columnResizing2;
          var deltaX = _clientX - startX;
          var percentageDeltaX = deltaX / _columnWidth;
          var newColumnWidths = {};
          _headerIdWidths.forEach(function(_ref2) {
            var headerId = _ref2[0], headerWidth = _ref2[1];
            newColumnWidths[headerId] = Math.max(headerWidth + headerWidth * percentageDeltaX, 0);
          });
          return _extends({}, state, {
            columnResizing: _extends({}, state.columnResizing, {
              columnWidths: _extends({}, state.columnResizing.columnWidths, {}, newColumnWidths)
            })
          });
        }
        if (action.type === actions.columnDoneResizing) {
          return _extends({}, state, {
            columnResizing: _extends({}, state.columnResizing, {
              startX: null,
              isResizingColumn: null
            })
          });
        }
      }
      var useInstanceBeforeDimensions$1 = function useInstanceBeforeDimensions2(instance) {
        var flatHeaders = instance.flatHeaders, disableResizing = instance.disableResizing, getHooks = instance.getHooks, columnResizing = instance.state.columnResizing;
        var getInstance = useGetLatest(instance);
        flatHeaders.forEach(function(header) {
          var canResize = getFirstDefined(header.disableResizing === true ? false : void 0, disableResizing === true ? false : void 0, true);
          header.canResize = canResize;
          header.width = columnResizing.columnWidths[header.id] || header.originalWidth || header.width;
          header.isResizing = columnResizing.isResizingColumn === header.id;
          if (canResize) {
            header.getResizerProps = makePropGetter(getHooks().getResizerProps, {
              instance: getInstance(),
              header
            });
          }
        });
      };
      function useInstance$b(instance) {
        var plugins = instance.plugins, dispatch = instance.dispatch, _instance$autoResetRe = instance.autoResetResize, autoResetResize = _instance$autoResetRe === void 0 ? true : _instance$autoResetRe, columns = instance.columns;
        ensurePluginOrder(plugins, ["useAbsoluteLayout"], "useResizeColumns");
        var getAutoResetResize = useGetLatest(autoResetResize);
        useMountedLayoutEffect(function() {
          if (getAutoResetResize()) {
            dispatch({
              type: actions.resetResize
            });
          }
        }, [columns]);
        var resetResizing = React.useCallback(function() {
          return dispatch({
            type: actions.resetResize
          });
        }, [dispatch]);
        Object.assign(instance, {
          resetResizing
        });
      }
      function getLeafHeaders(header) {
        var leafHeaders = [];
        var recurseHeader = function recurseHeader2(header2) {
          if (header2.columns && header2.columns.length) {
            header2.columns.map(recurseHeader2);
          }
          leafHeaders.push(header2);
        };
        recurseHeader(header);
        return leafHeaders;
      }
      var cellStyles = {
        position: "absolute",
        top: 0
      };
      var useAbsoluteLayout = function useAbsoluteLayout2(hooks) {
        hooks.getTableBodyProps.push(getRowStyles);
        hooks.getRowProps.push(getRowStyles);
        hooks.getHeaderGroupProps.push(getRowStyles);
        hooks.getFooterGroupProps.push(getRowStyles);
        hooks.getHeaderProps.push(function(props, _ref) {
          var column = _ref.column;
          return [props, {
            style: _extends({}, cellStyles, {
              left: column.totalLeft + "px",
              width: column.totalWidth + "px"
            })
          }];
        });
        hooks.getCellProps.push(function(props, _ref2) {
          var cell = _ref2.cell;
          return [props, {
            style: _extends({}, cellStyles, {
              left: cell.column.totalLeft + "px",
              width: cell.column.totalWidth + "px"
            })
          }];
        });
        hooks.getFooterProps.push(function(props, _ref3) {
          var column = _ref3.column;
          return [props, {
            style: _extends({}, cellStyles, {
              left: column.totalLeft + "px",
              width: column.totalWidth + "px"
            })
          }];
        });
      };
      useAbsoluteLayout.pluginName = "useAbsoluteLayout";
      var getRowStyles = function getRowStyles2(props, _ref4) {
        var instance = _ref4.instance;
        return [props, {
          style: {
            position: "relative",
            width: instance.totalColumnsWidth + "px"
          }
        }];
      };
      var cellStyles$1 = {
        display: "inline-block",
        boxSizing: "border-box"
      };
      var getRowStyles$1 = function getRowStyles2(props, _ref) {
        var instance = _ref.instance;
        return [props, {
          style: {
            display: "flex",
            width: instance.totalColumnsWidth + "px"
          }
        }];
      };
      var useBlockLayout = function useBlockLayout2(hooks) {
        hooks.getRowProps.push(getRowStyles$1);
        hooks.getHeaderGroupProps.push(getRowStyles$1);
        hooks.getFooterGroupProps.push(getRowStyles$1);
        hooks.getHeaderProps.push(function(props, _ref2) {
          var column = _ref2.column;
          return [props, {
            style: _extends({}, cellStyles$1, {
              width: column.totalWidth + "px"
            })
          }];
        });
        hooks.getCellProps.push(function(props, _ref3) {
          var cell = _ref3.cell;
          return [props, {
            style: _extends({}, cellStyles$1, {
              width: cell.column.totalWidth + "px"
            })
          }];
        });
        hooks.getFooterProps.push(function(props, _ref4) {
          var column = _ref4.column;
          return [props, {
            style: _extends({}, cellStyles$1, {
              width: column.totalWidth + "px"
            })
          }];
        });
      };
      useBlockLayout.pluginName = "useBlockLayout";
      function useFlexLayout(hooks) {
        hooks.getTableProps.push(getTableProps);
        hooks.getRowProps.push(getRowStyles$2);
        hooks.getHeaderGroupProps.push(getRowStyles$2);
        hooks.getFooterGroupProps.push(getRowStyles$2);
        hooks.getHeaderProps.push(getHeaderProps);
        hooks.getCellProps.push(getCellProps);
        hooks.getFooterProps.push(getFooterProps);
      }
      useFlexLayout.pluginName = "useFlexLayout";
      var getTableProps = function getTableProps2(props, _ref) {
        var instance = _ref.instance;
        return [props, {
          style: {
            minWidth: instance.totalColumnsMinWidth + "px"
          }
        }];
      };
      var getRowStyles$2 = function getRowStyles2(props, _ref2) {
        var instance = _ref2.instance;
        return [props, {
          style: {
            display: "flex",
            flex: "1 0 auto",
            minWidth: instance.totalColumnsMinWidth + "px"
          }
        }];
      };
      var getHeaderProps = function getHeaderProps2(props, _ref3) {
        var column = _ref3.column;
        return [props, {
          style: {
            boxSizing: "border-box",
            flex: column.totalFlexWidth ? column.totalFlexWidth + " 0 auto" : void 0,
            minWidth: column.totalMinWidth + "px",
            width: column.totalWidth + "px"
          }
        }];
      };
      var getCellProps = function getCellProps2(props, _ref4) {
        var cell = _ref4.cell;
        return [props, {
          style: {
            boxSizing: "border-box",
            flex: cell.column.totalFlexWidth + " 0 auto",
            minWidth: cell.column.totalMinWidth + "px",
            width: cell.column.totalWidth + "px"
          }
        }];
      };
      var getFooterProps = function getFooterProps2(props, _ref5) {
        var column = _ref5.column;
        return [props, {
          style: {
            boxSizing: "border-box",
            flex: column.totalFlexWidth ? column.totalFlexWidth + " 0 auto" : void 0,
            minWidth: column.totalMinWidth + "px",
            width: column.totalWidth + "px"
          }
        }];
      };
      actions.columnStartResizing = "columnStartResizing";
      actions.columnResizing = "columnResizing";
      actions.columnDoneResizing = "columnDoneResizing";
      actions.resetResize = "resetResize";
      function useGridLayout(hooks) {
        hooks.stateReducers.push(reducer$c);
        hooks.getTableProps.push(getTableProps$1);
        hooks.getHeaderProps.push(getHeaderProps$1);
        hooks.getRowProps.push(getRowProps);
      }
      useGridLayout.pluginName = "useGridLayout";
      var getTableProps$1 = function getTableProps2(props, _ref) {
        var instance = _ref.instance;
        var gridTemplateColumns = instance.visibleColumns.map(function(column) {
          var _instance$state$colum;
          if (instance.state.gridLayout.columnWidths[column.id])
            return instance.state.gridLayout.columnWidths[column.id] + "px";
          if ((_instance$state$colum = instance.state.columnResizing) == null ? void 0 : _instance$state$colum.isResizingColumn)
            return instance.state.gridLayout.startWidths[column.id] + "px";
          if (typeof column.width === "number")
            return column.width + "px";
          return column.width;
        });
        return [props, {
          style: {
            display: "grid",
            gridTemplateColumns: gridTemplateColumns.join(" ")
          }
        }];
      };
      var getHeaderProps$1 = function getHeaderProps2(props, _ref2) {
        var column = _ref2.column;
        return [props, {
          id: "header-cell-" + column.id,
          style: {
            position: "sticky",
            //enables a scroll wrapper to be placed around the table and have sticky headers
            gridColumn: "span " + column.totalVisibleHeaderCount
          }
        }];
      };
      var getRowProps = function getRowProps2(props, _ref3) {
        var row = _ref3.row;
        if (row.isExpanded) {
          return [props, {
            style: {
              gridColumn: "1 / " + (row.cells.length + 1)
            }
          }];
        }
        return [props, {}];
      };
      function reducer$c(state, action, previousState, instance) {
        if (action.type === actions.init) {
          return _extends({
            gridLayout: {
              columnWidths: {}
            }
          }, state);
        }
        if (action.type === actions.resetResize) {
          return _extends({}, state, {
            gridLayout: {
              columnWidths: {}
            }
          });
        }
        if (action.type === actions.columnStartResizing) {
          var columnId = action.columnId, headerIdWidths = action.headerIdWidths;
          var columnWidth = getElementWidth(columnId);
          if (columnWidth !== void 0) {
            var startWidths = instance.visibleColumns.reduce(function(acc, column) {
              var _extends2;
              return _extends({}, acc, (_extends2 = {}, _extends2[column.id] = getElementWidth(column.id), _extends2));
            }, {});
            var minWidths = instance.visibleColumns.reduce(function(acc, column) {
              var _extends3;
              return _extends({}, acc, (_extends3 = {}, _extends3[column.id] = column.minWidth, _extends3));
            }, {});
            var maxWidths = instance.visibleColumns.reduce(function(acc, column) {
              var _extends4;
              return _extends({}, acc, (_extends4 = {}, _extends4[column.id] = column.maxWidth, _extends4));
            }, {});
            var headerIdGridWidths = headerIdWidths.map(function(_ref4) {
              var headerId = _ref4[0];
              return [headerId, getElementWidth(headerId)];
            });
            return _extends({}, state, {
              gridLayout: _extends({}, state.gridLayout, {
                startWidths,
                minWidths,
                maxWidths,
                headerIdGridWidths,
                columnWidth
              })
            });
          } else {
            return state;
          }
        }
        if (action.type === actions.columnResizing) {
          var clientX = action.clientX;
          var startX = state.columnResizing.startX;
          var _state$gridLayout = state.gridLayout, _columnWidth = _state$gridLayout.columnWidth, _minWidths = _state$gridLayout.minWidths, _maxWidths = _state$gridLayout.maxWidths, _state$gridLayout$hea = _state$gridLayout.headerIdGridWidths, _headerIdGridWidths = _state$gridLayout$hea === void 0 ? [] : _state$gridLayout$hea;
          var deltaX = clientX - startX;
          var percentageDeltaX = deltaX / _columnWidth;
          var newColumnWidths = {};
          _headerIdGridWidths.forEach(function(_ref5) {
            var headerId = _ref5[0], headerWidth = _ref5[1];
            newColumnWidths[headerId] = Math.min(Math.max(_minWidths[headerId], headerWidth + headerWidth * percentageDeltaX), _maxWidths[headerId]);
          });
          return _extends({}, state, {
            gridLayout: _extends({}, state.gridLayout, {
              columnWidths: _extends({}, state.gridLayout.columnWidths, {}, newColumnWidths)
            })
          });
        }
        if (action.type === actions.columnDoneResizing) {
          return _extends({}, state, {
            gridLayout: _extends({}, state.gridLayout, {
              startWidths: {},
              minWidths: {},
              maxWidths: {}
            })
          });
        }
      }
      function getElementWidth(columnId) {
        var _document$getElementB;
        var width = (_document$getElementB = document.getElementById("header-cell-" + columnId)) == null ? void 0 : _document$getElementB.offsetWidth;
        if (width !== void 0) {
          return width;
        }
      }
      exports2._UNSTABLE_usePivotColumns = _UNSTABLE_usePivotColumns;
      exports2.actions = actions;
      exports2.defaultColumn = defaultColumn;
      exports2.defaultGroupByFn = defaultGroupByFn;
      exports2.defaultOrderByFn = defaultOrderByFn;
      exports2.defaultRenderer = defaultRenderer;
      exports2.emptyRenderer = emptyRenderer;
      exports2.ensurePluginOrder = ensurePluginOrder;
      exports2.flexRender = flexRender;
      exports2.functionalUpdate = functionalUpdate;
      exports2.loopHooks = loopHooks;
      exports2.makePropGetter = makePropGetter;
      exports2.makeRenderer = makeRenderer;
      exports2.reduceHooks = reduceHooks;
      exports2.safeUseLayoutEffect = safeUseLayoutEffect;
      exports2.useAbsoluteLayout = useAbsoluteLayout;
      exports2.useAsyncDebounce = useAsyncDebounce;
      exports2.useBlockLayout = useBlockLayout;
      exports2.useColumnOrder = useColumnOrder;
      exports2.useExpanded = useExpanded;
      exports2.useFilters = useFilters;
      exports2.useFlexLayout = useFlexLayout;
      exports2.useGetLatest = useGetLatest;
      exports2.useGlobalFilter = useGlobalFilter;
      exports2.useGridLayout = useGridLayout;
      exports2.useGroupBy = useGroupBy;
      exports2.useMountedLayoutEffect = useMountedLayoutEffect;
      exports2.usePagination = usePagination;
      exports2.useResizeColumns = useResizeColumns;
      exports2.useRowSelect = useRowSelect;
      exports2.useRowState = useRowState;
      exports2.useSortBy = useSortBy;
      exports2.useTable = useTable;
      Object.defineProperty(exports2, "__esModule", { value: true });
    });
  }
});

// node_modules/react-table/index.js
var require_react_table = __commonJS({
  "node_modules/react-table/index.js"(exports, module) {
    if (false) {
      module.exports = null;
    } else {
      module.exports = require_react_table_development();
    }
  }
});
export default require_react_table();
//# sourceMappingURL=react-table.js.map
