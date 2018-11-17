/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-css version: 1.3.3(69ad62c9851c1708c61446b6ac2218b99fcdd428)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-css/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
!(function(e) {
  if ('object' == typeof module && 'object' == typeof module.exports) {
    var n = e(require, exports);
    void 0 !== n && (module.exports = n);
  } else
    'function' == typeof define &&
      define.amd &&
      define('vs/language/css/workerManager', ['require', 'exports'], e);
})(function(e, n) {
  function t(e) {
    var n,
      t,
      i = new r(
        function(e, r) {
          (n = e), (t = r);
        },
        function() {}
      );
    return e.then(n, t), i;
  }
  Object.defineProperty(n, '__esModule', { value: !0 });
  var r = monaco.Promise,
    i = 12e4,
    o = (function() {
      function e(e) {
        var n = this;
        (this._defaults = e),
          (this._worker = null),
          (this._idleCheckInterval = setInterval(function() {
            return n._checkIfIdle();
          }, 3e4)),
          (this._lastUsedTime = 0),
          (this._configChangeListener = this._defaults.onDidChange(function() {
            return n._stopWorker();
          }));
      }
      return (
        (e.prototype._stopWorker = function() {
          this._worker && (this._worker.dispose(), (this._worker = null)), (this._client = null);
        }),
        (e.prototype.dispose = function() {
          clearInterval(this._idleCheckInterval),
            this._configChangeListener.dispose(),
            this._stopWorker();
        }),
        (e.prototype._checkIfIdle = function() {
          if (this._worker) {
            var e = Date.now() - this._lastUsedTime;
            e > i && this._stopWorker();
          }
        }),
        (e.prototype._getClient = function() {
          return (
            (this._lastUsedTime = Date.now()),
            this._client ||
              ((this._worker = monaco.editor.createWebWorker({
                moduleId: 'vs/language/css/cssWorker',
                label: this._defaults.languageId,
                createData: {
                  languageSettings: this._defaults.diagnosticsOptions,
                  languageId: this._defaults.languageId,
                },
              })),
              (this._client = this._worker.getProxy())),
            this._client
          );
        }),
        (e.prototype.getLanguageServiceWorker = function() {
          for (var e = this, n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
          var i;
          return t(
            this._getClient()
              .then(function(e) {
                i = e;
              })
              .then(function(t) {
                return e._worker.withSyncedResources(n);
              })
              .then(function(e) {
                return i;
              })
          );
        }),
        e
      );
    })();
  n.WorkerManager = o;
}),
  (function(e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var n = e(require, exports);
      void 0 !== n && (module.exports = n);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vscode-languageserver-types/main', ['require', 'exports'], e);
  })(function(e, n) {
    Object.defineProperty(n, '__esModule', { value: !0 });
    var t;
    !(function(e) {
      function n(e, n) {
        return { line: e, character: n };
      }
      function t(e) {
        var n = e;
        return A.defined(n) && A.number(n.line) && A.number(n.character);
      }
      (e.create = n), (e.is = t);
    })((t = n.Position || (n.Position = {})));
    var r;
    !(function(e) {
      function n(e, n, r, i) {
        if (A.number(e) && A.number(n) && A.number(r) && A.number(i))
          return { start: t.create(e, n), end: t.create(r, i) };
        if (t.is(e) && t.is(n)) return { start: e, end: n };
        throw new Error(
          'Range#create called with invalid arguments[' + e + ', ' + n + ', ' + r + ', ' + i + ']'
        );
      }
      function r(e) {
        var n = e;
        return A.defined(n) && t.is(n.start) && t.is(n.end);
      }
      (e.create = n), (e.is = r);
    })((r = n.Range || (n.Range = {})));
    var i;
    !(function(e) {
      function n(e, n) {
        return { uri: e, range: n };
      }
      function t(e) {
        var n = e;
        return A.defined(n) && r.is(n.range) && (A.string(n.uri) || A.undefined(n.uri));
      }
      (e.create = n), (e.is = t);
    })((i = n.Location || (n.Location = {})));
    var o;
    !(function(e) {
      (e.Error = 1), (e.Warning = 2), (e.Information = 3), (e.Hint = 4);
    })((o = n.DiagnosticSeverity || (n.DiagnosticSeverity = {})));
    var a;
    !(function(e) {
      function n(e, n, t, r, i) {
        var o = { range: e, message: n };
        return (
          A.defined(t) && (o.severity = t),
          A.defined(r) && (o.code = r),
          A.defined(i) && (o.source = i),
          o
        );
      }
      function t(e) {
        var n = e;
        return (
          A.defined(n) &&
          r.is(n.range) &&
          A.string(n.message) &&
          (A.number(n.severity) || A.undefined(n.severity)) &&
          (A.number(n.code) || A.string(n.code) || A.undefined(n.code)) &&
          (A.string(n.source) || A.undefined(n.source))
        );
      }
      (e.create = n), (e.is = t);
    })((a = n.Diagnostic || (n.Diagnostic = {})));
    var u;
    !(function(e) {
      function n(e, n) {
        for (var t = [], r = 2; r < arguments.length; r++) t[r - 2] = arguments[r];
        var i = { title: e, command: n };
        return A.defined(t) && t.length > 0 && (i.arguments = t), i;
      }
      function t(e) {
        var n = e;
        return A.defined(n) && A.string(n.title) && A.string(n.title);
      }
      (e.create = n), (e.is = t);
    })((u = n.Command || (n.Command = {})));
    var s;
    !(function(e) {
      function n(e, n) {
        return { range: e, newText: n };
      }
      function t(e, n) {
        return { range: { start: e, end: e }, newText: n };
      }
      function r(e) {
        return { range: e, newText: '' };
      }
      (e.replace = n), (e.insert = t), (e.del = r);
    })((s = n.TextEdit || (n.TextEdit = {})));
    var c;
    !(function(e) {
      function n(e, n) {
        return { textDocument: e, edits: n };
      }
      function t(e) {
        var n = e;
        return A.defined(n) && g.is(n.textDocument) && Array.isArray(n.edits);
      }
      (e.create = n), (e.is = t);
    })((c = n.TextDocumentEdit || (n.TextDocumentEdit = {})));
    var d = (function() {
        function e(e) {
          this.edits = e;
        }
        return (
          (e.prototype.insert = function(e, n) {
            this.edits.push(s.insert(e, n));
          }),
          (e.prototype.replace = function(e, n) {
            this.edits.push(s.replace(e, n));
          }),
          (e.prototype['delete'] = function(e) {
            this.edits.push(s.del(e));
          }),
          (e.prototype.add = function(e) {
            this.edits.push(e);
          }),
          (e.prototype.all = function() {
            return this.edits;
          }),
          (e.prototype.clear = function() {
            this.edits.splice(0, this.edits.length);
          }),
          e
        );
      })(),
      f = (function() {
        function e(e) {
          var n = this;
          (this._textEditChanges = Object.create(null)),
            e &&
              ((this._workspaceEdit = e),
              e.documentChanges
                ? e.documentChanges.forEach(function(e) {
                    var t = new d(e.edits);
                    n._textEditChanges[e.textDocument.uri] = t;
                  })
                : e.changes &&
                  Object.keys(e.changes).forEach(function(t) {
                    var r = new d(e.changes[t]);
                    n._textEditChanges[t] = r;
                  }));
        }
        return (
          Object.defineProperty(e.prototype, 'edit', {
            get: function() {
              return this._workspaceEdit;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.getTextEditChange = function(e) {
            if (g.is(e)) {
              if (
                (this._workspaceEdit || (this._workspaceEdit = { documentChanges: [] }),
                !this._workspaceEdit.documentChanges)
              )
                throw new Error('Workspace edit is not configured for versioned document changes.');
              var n = e,
                t = this._textEditChanges[n.uri];
              if (!t) {
                var r = [],
                  i = { textDocument: n, edits: r };
                this._workspaceEdit.documentChanges.push(i),
                  (t = new d(r)),
                  (this._textEditChanges[n.uri] = t);
              }
              return t;
            }
            if (
              (this._workspaceEdit || (this._workspaceEdit = { changes: Object.create(null) }),
              !this._workspaceEdit.changes)
            )
              throw new Error('Workspace edit is not configured for normal text edit changes.');
            var t = this._textEditChanges[e];
            if (!t) {
              var r = [];
              (this._workspaceEdit.changes[e] = r), (t = new d(r)), (this._textEditChanges[e] = t);
            }
            return t;
          }),
          e
        );
      })();
    n.WorkspaceChange = f;
    var l;
    !(function(e) {
      function n(e) {
        return { uri: e };
      }
      function t(e) {
        var n = e;
        return A.defined(n) && A.string(n.uri);
      }
      (e.create = n), (e.is = t);
    })((l = n.TextDocumentIdentifier || (n.TextDocumentIdentifier = {})));
    var g;
    !(function(e) {
      function n(e, n) {
        return { uri: e, version: n };
      }
      function t(e) {
        var n = e;
        return A.defined(n) && A.string(n.uri) && A.number(n.version);
      }
      (e.create = n), (e.is = t);
    })((g = n.VersionedTextDocumentIdentifier || (n.VersionedTextDocumentIdentifier = {})));
    var m;
    !(function(e) {
      function n(e, n, t, r) {
        return { uri: e, languageId: n, version: t, text: r };
      }
      function t(e) {
        var n = e;
        return (
          A.defined(n) &&
          A.string(n.uri) &&
          A.string(n.languageId) &&
          A.number(n.version) &&
          A.string(n.text)
        );
      }
      (e.create = n), (e.is = t);
    })((m = n.TextDocumentItem || (n.TextDocumentItem = {})));
    var p;
    !(function(e) {
      (e.Text = 1),
        (e.Method = 2),
        (e.Function = 3),
        (e.Constructor = 4),
        (e.Field = 5),
        (e.Variable = 6),
        (e.Class = 7),
        (e.Interface = 8),
        (e.Module = 9),
        (e.Property = 10),
        (e.Unit = 11),
        (e.Value = 12),
        (e.Enum = 13),
        (e.Keyword = 14),
        (e.Snippet = 15),
        (e.Color = 16),
        (e.File = 17),
        (e.Reference = 18);
    })((p = n.CompletionItemKind || (n.CompletionItemKind = {})));
    var h;
    !(function(e) {
      (e.PlainText = 1), (e.Snippet = 2);
    })((h = n.InsertTextFormat || (n.InsertTextFormat = {})));
    var v;
    !(function(e) {
      function n(e) {
        return { label: e };
      }
      e.create = n;
    })((v = n.CompletionItem || (n.CompletionItem = {})));
    var y;
    !(function(e) {
      function n(e, n) {
        return { items: e ? e : [], isIncomplete: !!n };
      }
      e.create = n;
    })((y = n.CompletionList || (n.CompletionList = {})));
    var b;
    !(function(e) {
      function n(e) {
        return e.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
      }
      e.fromPlainText = n;
    })((b = n.MarkedString || (n.MarkedString = {})));
    var _;
    !(function(e) {
      function n(e, n) {
        return n ? { label: e, documentation: n } : { label: e };
      }
      e.create = n;
    })((_ = n.ParameterInformation || (n.ParameterInformation = {})));
    var C;
    !(function(e) {
      function n(e, n) {
        for (var t = [], r = 2; r < arguments.length; r++) t[r - 2] = arguments[r];
        var i = { label: e };
        return (
          A.defined(n) && (i.documentation = n),
          A.defined(t) ? (i.parameters = t) : (i.parameters = []),
          i
        );
      }
      e.create = n;
    })((C = n.SignatureInformation || (n.SignatureInformation = {})));
    var x;
    !(function(e) {
      (e.Text = 1), (e.Read = 2), (e.Write = 3);
    })((x = n.DocumentHighlightKind || (n.DocumentHighlightKind = {})));
    var I;
    !(function(e) {
      function n(e, n) {
        var t = { range: e };
        return A.number(n) && (t.kind = n), t;
      }
      e.create = n;
    })((I = n.DocumentHighlight || (n.DocumentHighlight = {})));
    var w;
    !(function(e) {
      (e.File = 1),
        (e.Module = 2),
        (e.Namespace = 3),
        (e.Package = 4),
        (e.Class = 5),
        (e.Method = 6),
        (e.Property = 7),
        (e.Field = 8),
        (e.Constructor = 9),
        (e.Enum = 10),
        (e.Interface = 11),
        (e.Function = 12),
        (e.Variable = 13),
        (e.Constant = 14),
        (e.String = 15),
        (e.Number = 16),
        (e.Boolean = 17),
        (e.Array = 18);
    })((w = n.SymbolKind || (n.SymbolKind = {})));
    var k;
    !(function(e) {
      function n(e, n, t, r, i) {
        var o = { name: e, kind: n, location: { uri: r, range: t } };
        return i && (o.containerName = i), o;
      }
      e.create = n;
    })((k = n.SymbolInformation || (n.SymbolInformation = {})));
    var S;
    !(function(e) {
      function n(e) {
        return { diagnostics: e };
      }
      function t(e) {
        var n = e;
        return A.defined(n) && A.typedArray(n.diagnostics, a.is);
      }
      (e.create = n), (e.is = t);
    })((S = n.CodeActionContext || (n.CodeActionContext = {})));
    var D;
    !(function(e) {
      function n(e, n) {
        var t = { range: e };
        return A.defined(n) && (t.data = n), t;
      }
      function t(e) {
        var n = e;
        return A.defined(n) && r.is(n.range) && (A.undefined(n.command) || u.is(n.command));
      }
      (e.create = n), (e.is = t);
    })((D = n.CodeLens || (n.CodeLens = {})));
    var K;
    !(function(e) {
      function n(e, n) {
        return { tabSize: e, insertSpaces: n };
      }
      function t(e) {
        var n = e;
        return A.defined(n) && A.number(n.tabSize) && A['boolean'](n.insertSpaces);
      }
      (e.create = n), (e.is = t);
    })((K = n.FormattingOptions || (n.FormattingOptions = {})));
    var T = (function() {
      function e() {}
      return e;
    })();
    (n.DocumentLink = T),
      (function(e) {
        function n(e, n) {
          return { range: e, target: n };
        }
        function t(e) {
          var n = e;
          return A.defined(n) && r.is(n.range) && (A.undefined(n.target) || A.string(n.target));
        }
        (e.create = n), (e.is = t);
      })((T = n.DocumentLink || (n.DocumentLink = {}))),
      (n.DocumentLink = T),
      (n.EOL = ['\n', '\r\n', '\r']);
    var E;
    !(function(e) {
      function n(e, n, t, r) {
        return new P(e, n, t, r);
      }
      function t(e) {
        var n = e;
        return !!(
          A.defined(n) &&
          A.string(n.uri) &&
          (A.undefined(n.languageId) || A.string(n.languageId)) &&
          A.number(n.lineCount) &&
          A.func(n.getText) &&
          A.func(n.positionAt) &&
          A.func(n.offsetAt)
        );
      }
      (e.create = n), (e.is = t);
    })((E = n.TextDocument || (n.TextDocument = {})));
    var M;
    !(function(e) {
      (e.Manual = 1), (e.AfterDelay = 2), (e.FocusOut = 3);
    })((M = n.TextDocumentSaveReason || (n.TextDocumentSaveReason = {})));
    var A,
      P = (function() {
        function e(e, n, t, r) {
          (this._uri = e),
            (this._languageId = n),
            (this._version = t),
            (this._content = r),
            (this._lineOffsets = null);
        }
        return (
          Object.defineProperty(e.prototype, 'uri', {
            get: function() {
              return this._uri;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'languageId', {
            get: function() {
              return this._languageId;
            },
            enumerable: !0,
            configurable: !0,
          }),
          Object.defineProperty(e.prototype, 'version', {
            get: function() {
              return this._version;
            },
            enumerable: !0,
            configurable: !0,
          }),
          (e.prototype.getText = function() {
            return this._content;
          }),
          (e.prototype.update = function(e, n) {
            (this._content = e.text), (this._version = n), (this._lineOffsets = null);
          }),
          (e.prototype.getLineOffsets = function() {
            if (null === this._lineOffsets) {
              for (var e = [], n = this._content, t = !0, r = 0; r < n.length; r++) {
                t && (e.push(r), (t = !1));
                var i = n.charAt(r);
                (t = '\r' === i || '\n' === i),
                  '\r' === i && r + 1 < n.length && '\n' === n.charAt(r + 1) && r++;
              }
              t && n.length > 0 && e.push(n.length), (this._lineOffsets = e);
            }
            return this._lineOffsets;
          }),
          (e.prototype.positionAt = function(e) {
            e = Math.max(Math.min(e, this._content.length), 0);
            var n = this.getLineOffsets(),
              r = 0,
              i = n.length;
            if (0 === i) return t.create(0, e);
            for (; i > r; ) {
              var o = Math.floor((r + i) / 2);
              n[o] > e ? (i = o) : (r = o + 1);
            }
            var a = r - 1;
            return t.create(a, e - n[a]);
          }),
          (e.prototype.offsetAt = function(e) {
            var n = this.getLineOffsets();
            if (e.line >= n.length) return this._content.length;
            if (e.line < 0) return 0;
            var t = n[e.line],
              r = e.line + 1 < n.length ? n[e.line + 1] : this._content.length;
            return Math.max(Math.min(t + e.character, r), t);
          }),
          Object.defineProperty(e.prototype, 'lineCount', {
            get: function() {
              return this.getLineOffsets().length;
            },
            enumerable: !0,
            configurable: !0,
          }),
          e
        );
      })();
    !(function(e) {
      function n(e) {
        return 'undefined' != typeof e;
      }
      function t(e) {
        return 'undefined' == typeof e;
      }
      function r(e) {
        return e === !0 || e === !1;
      }
      function i(e) {
        return '[object String]' === s.call(e);
      }
      function o(e) {
        return '[object Number]' === s.call(e);
      }
      function a(e) {
        return '[object Function]' === s.call(e);
      }
      function u(e, n) {
        return Array.isArray(e) && e.every(n);
      }
      var s = Object.prototype.toString;
      (e.defined = n),
        (e.undefined = t),
        (e['boolean'] = r),
        (e.string = i),
        (e.number = o),
        (e.func = a),
        (e.typedArray = u);
    })(A || (A = {}));
  }),
  define('vscode-languageserver-types', ['vscode-languageserver-types/main'], function(e) {
    return e;
  }),
  (function(e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var n = e(require, exports);
      void 0 !== n && (module.exports = n);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vs/language/css/languageFeatures', [
          'require',
          'exports',
          'vscode-languageserver-types',
        ], e);
  })(function(e, n) {
    function t(e) {
      switch (e) {
        case g.DiagnosticSeverity.Error:
          return monaco.Severity.Error;
        case g.DiagnosticSeverity.Warning:
          return monaco.Severity.Warning;
        case g.DiagnosticSeverity.Information:
        case g.DiagnosticSeverity.Hint:
        default:
          return monaco.Severity.Info;
      }
    }
    function r(e, n) {
      var r = 'number' == typeof n.code ? String(n.code) : n.code;
      return {
        severity: t(n.severity),
        startLineNumber: n.range.start.line + 1,
        startColumn: n.range.start.character + 1,
        endLineNumber: n.range.end.line + 1,
        endColumn: n.range.end.character + 1,
        message: n.message,
        code: r,
        source: n.source,
      };
    }
    function i(e) {
      return e ? { character: e.column - 1, line: e.lineNumber - 1 } : void 0;
    }
    function o(e) {
      return e
        ? new p(e.start.line + 1, e.start.character + 1, e.end.line + 1, e.end.character + 1)
        : void 0;
    }
    function a(e) {
      var n = monaco.languages.CompletionItemKind;
      switch (e) {
        case g.CompletionItemKind.Text:
          return n.Text;
        case g.CompletionItemKind.Method:
          return n.Method;
        case g.CompletionItemKind.Function:
          return n.Function;
        case g.CompletionItemKind.Constructor:
          return n.Constructor;
        case g.CompletionItemKind.Field:
          return n.Field;
        case g.CompletionItemKind.Variable:
          return n.Variable;
        case g.CompletionItemKind.Class:
          return n.Class;
        case g.CompletionItemKind.Interface:
          return n.Interface;
        case g.CompletionItemKind.Module:
          return n.Module;
        case g.CompletionItemKind.Property:
          return n.Property;
        case g.CompletionItemKind.Unit:
          return n.Unit;
        case g.CompletionItemKind.Value:
          return n.Value;
        case g.CompletionItemKind.Enum:
          return n.Enum;
        case g.CompletionItemKind.Keyword:
          return n.Keyword;
        case g.CompletionItemKind.Snippet:
          return n.Snippet;
        case g.CompletionItemKind.Color:
          return n.Color;
        case g.CompletionItemKind.File:
          return n.File;
        case g.CompletionItemKind.Reference:
          return n.Reference;
      }
      return n.Property;
    }
    function u(e) {
      return e ? (Array.isArray(e) ? e : [e]) : void 0;
    }
    function s(e) {
      switch (e) {
        case g.DocumentHighlightKind.Read:
          return monaco.languages.DocumentHighlightKind.Read;
        case g.DocumentHighlightKind.Write:
          return monaco.languages.DocumentHighlightKind.Write;
        case g.DocumentHighlightKind.Text:
          return monaco.languages.DocumentHighlightKind.Text;
      }
      return monaco.languages.DocumentHighlightKind.Text;
    }
    function c(e) {
      return { uri: m.parse(e.uri), range: o(e.range) };
    }
    function d(e) {
      if (e && e.changes) {
        var n = [];
        for (var t in e.changes)
          for (var r = 0, i = e.changes[t]; r < i.length; r++) {
            var a = i[r];
            n.push({ resource: m.parse(t), range: o(a.range), newText: a.newText });
          }
        return { edits: n };
      }
    }
    function f(e) {
      var n = monaco.languages.SymbolKind;
      switch (e) {
        case g.SymbolKind.File:
          return n.Array;
        case g.SymbolKind.Module:
          return n.Module;
        case g.SymbolKind.Namespace:
          return n.Namespace;
        case g.SymbolKind.Package:
          return n.Package;
        case g.SymbolKind.Class:
          return n.Class;
        case g.SymbolKind.Method:
          return n.Method;
        case g.SymbolKind.Property:
          return n.Property;
        case g.SymbolKind.Field:
          return n.Field;
        case g.SymbolKind.Constructor:
          return n.Constructor;
        case g.SymbolKind.Enum:
          return n.Enum;
        case g.SymbolKind.Interface:
          return n.Interface;
        case g.SymbolKind.Function:
          return n.Function;
        case g.SymbolKind.Variable:
          return n.Variable;
        case g.SymbolKind.Constant:
          return n.Constant;
        case g.SymbolKind.String:
          return n.String;
        case g.SymbolKind.Number:
          return n.Number;
        case g.SymbolKind.Boolean:
          return n.Boolean;
        case g.SymbolKind.Array:
          return n.Array;
      }
      return n.Function;
    }
    function l(e, n) {
      return (
        e.onCancellationRequested(function() {
          return n.cancel();
        }),
        n
      );
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var g = e('vscode-languageserver-types'),
      m = monaco.Uri,
      p = monaco.Range,
      h = (function() {
        function e(e, n) {
          var t = this;
          (this._languageId = e),
            (this._worker = n),
            (this._disposables = []),
            (this._listener = Object.create(null));
          var r = function(e) {
              var n = e.getModeId();
              if (n === t._languageId) {
                var r;
                (t._listener[e.uri.toString()] = e.onDidChangeContent(function() {
                  clearTimeout(r),
                    (r = setTimeout(function() {
                      return t._doValidate(e.uri, n);
                    }, 500));
                })),
                  t._doValidate(e.uri, n);
              }
            },
            i = function(e) {
              monaco.editor.setModelMarkers(e, t._languageId, []);
              var n = e.uri.toString(),
                r = t._listener[n];
              r && (r.dispose(), delete t._listener[n]);
            };
          this._disposables.push(monaco.editor.onDidCreateModel(r)),
            this._disposables.push(monaco.editor.onWillDisposeModel(i)),
            this._disposables.push(
              monaco.editor.onDidChangeModelLanguage(function(e) {
                i(e.model), r(e.model);
              })
            ),
            this._disposables.push({
              dispose: function() {
                for (var e in t._listener) t._listener[e].dispose();
              },
            }),
            monaco.editor.getModels().forEach(r);
        }
        return (
          (e.prototype.dispose = function() {
            this._disposables.forEach(function(e) {
              return e && e.dispose();
            }),
              (this._disposables = []);
          }),
          (e.prototype._doValidate = function(e, n) {
            this._worker(e)
              .then(function(n) {
                return n.doValidation(e.toString());
              })
              .then(function(t) {
                var i = t.map(function(n) {
                    return r(e, n);
                  }),
                  o = monaco.editor.getModel(e);
                o.getModeId() === n && monaco.editor.setModelMarkers(o, n, i);
              })
              .done(void 0, function(e) {
                console.error(e);
              });
          }),
          e
        );
      })();
    n.DiagnostcsAdapter = h;
    var v = (function() {
      function e(e) {
        this._worker = e;
      }
      return (
        Object.defineProperty(e.prototype, 'triggerCharacters', {
          get: function() {
            return [' ', ':'];
          },
          enumerable: !0,
          configurable: !0,
        }),
        (e.prototype.provideCompletionItems = function(e, n, t) {
          var r = (e.getWordUntilPosition(n), e.uri);
          return l(
            t,
            this._worker(r)
              .then(function(e) {
                return e.doComplete(r.toString(), i(n));
              })
              .then(function(e) {
                if (e) {
                  var n = e.items.map(function(e) {
                    var n = {
                      label: e.label,
                      insertText: e.insertText,
                      sortText: e.sortText,
                      filterText: e.filterText,
                      documentation: e.documentation,
                      detail: e.detail,
                      kind: a(e.kind),
                    };
                    return (
                      e.textEdit &&
                        ((n.range = o(e.textEdit.range)), (n.insertText = e.textEdit.newText)),
                      e.insertTextFormat === g.InsertTextFormat.Snippet &&
                        (n.insertText = { value: n.insertText }),
                      n
                    );
                  });
                  return { isIncomplete: e.isIncomplete, items: n };
                }
              })
          );
        }),
        e
      );
    })();
    n.CompletionAdapter = v;
    var y = (function() {
      function e(e) {
        this._worker = e;
      }
      return (
        (e.prototype.provideHover = function(e, n, t) {
          var r = e.uri;
          return l(
            t,
            this._worker(r)
              .then(function(e) {
                return e.doHover(r.toString(), i(n));
              })
              .then(function(e) {
                return e ? { range: o(e.range), contents: u(e.contents) } : void 0;
              })
          );
        }),
        e
      );
    })();
    n.HoverAdapter = y;
    var b = (function() {
      function e(e) {
        this._worker = e;
      }
      return (
        (e.prototype.provideDocumentHighlights = function(e, n, t) {
          var r = e.uri;
          return l(
            t,
            this._worker(r)
              .then(function(e) {
                return e.findDocumentHighlights(r.toString(), i(n));
              })
              .then(function(e) {
                return e
                  ? e.map(function(e) {
                      return { range: o(e.range), kind: s(e.kind) };
                    })
                  : void 0;
              })
          );
        }),
        e
      );
    })();
    n.DocumentHighlightAdapter = b;
    var _ = (function() {
      function e(e) {
        this._worker = e;
      }
      return (
        (e.prototype.provideDefinition = function(e, n, t) {
          var r = e.uri;
          return l(
            t,
            this._worker(r)
              .then(function(e) {
                return e.findDefinition(r.toString(), i(n));
              })
              .then(function(e) {
                return e ? [c(e)] : void 0;
              })
          );
        }),
        e
      );
    })();
    n.DefinitionAdapter = _;
    var C = (function() {
      function e(e) {
        this._worker = e;
      }
      return (
        (e.prototype.provideReferences = function(e, n, t, r) {
          var o = e.uri;
          return l(
            r,
            this._worker(o)
              .then(function(e) {
                return e.findReferences(o.toString(), i(n));
              })
              .then(function(e) {
                return e ? e.map(c) : void 0;
              })
          );
        }),
        e
      );
    })();
    n.ReferenceAdapter = C;
    var x = (function() {
      function e(e) {
        this._worker = e;
      }
      return (
        (e.prototype.provideRenameEdits = function(e, n, t, r) {
          var o = e.uri;
          return l(
            r,
            this._worker(o)
              .then(function(e) {
                return e.doRename(o.toString(), i(n), t);
              })
              .then(function(e) {
                return d(e);
              })
          );
        }),
        e
      );
    })();
    n.RenameAdapter = x;
    var I = (function() {
      function e(e) {
        this._worker = e;
      }
      return (
        (e.prototype.provideDocumentSymbols = function(e, n) {
          var t = e.uri;
          return l(
            n,
            this._worker(t)
              .then(function(e) {
                return e.findDocumentSymbols(t.toString());
              })
              .then(function(e) {
                return e
                  ? e.map(function(e) {
                      return {
                        name: e.name,
                        containerName: e.containerName,
                        kind: f(e.kind),
                        location: c(e.location),
                      };
                    })
                  : void 0;
              })
          );
        }),
        e
      );
    })();
    n.DocumentSymbolAdapter = I;
  }),
  (function(e) {
    if ('object' == typeof module && 'object' == typeof module.exports) {
      var n = e(require, exports);
      void 0 !== n && (module.exports = n);
    } else
      'function' == typeof define &&
        define.amd &&
        define('vs/language/css/cssMode', [
          'require',
          'exports',
          './workerManager',
          './languageFeatures',
        ], e);
  })(function(e, n) {
    function t(e) {
      var n = [],
        t = new r.WorkerManager(e);
      n.push(t);
      var o = function(e) {
          for (var n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
          return t.getLanguageServiceWorker.apply(t, [e].concat(n));
        },
        a = e.languageId;
      n.push(monaco.languages.registerCompletionItemProvider(a, new i.CompletionAdapter(o))),
        n.push(monaco.languages.registerHoverProvider(a, new i.HoverAdapter(o))),
        n.push(
          monaco.languages.registerDocumentHighlightProvider(a, new i.DocumentHighlightAdapter(o))
        ),
        n.push(monaco.languages.registerDefinitionProvider(a, new i.DefinitionAdapter(o))),
        n.push(monaco.languages.registerReferenceProvider(a, new i.ReferenceAdapter(o))),
        n.push(monaco.languages.registerDocumentSymbolProvider(a, new i.DocumentSymbolAdapter(o))),
        n.push(monaco.languages.registerRenameProvider(a, new i.RenameAdapter(o))),
        n.push(new i.DiagnostcsAdapter(a, o));
    }
    Object.defineProperty(n, '__esModule', { value: !0 });
    var r = e('./workerManager'),
      i = e('./languageFeatures');
    n.setupMode = t;
  });
