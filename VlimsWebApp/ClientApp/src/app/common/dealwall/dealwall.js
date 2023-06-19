var dealwall = k.extend({
    init: function (elem, options) {
        var a = this;
        k.fn.init.call(a, elem, options);
        a._creatControl();
    },
    dealwallitems: [],
    fileselect: null,
    deletenotes: null,
    editnotes: null,
    filedata: null,
    newattachmentobj: null,
    newnoteobj: null,
    edititemcopy: null,
    addNoteValidator: null,
    addAttachmentValidator: null,
    editValdator: null,
    errorTemplate: "<span><div style='display:none;'>#=message#</div><span>",        
    _creatControl: function () {
        var a = this, _html = g.format($._loadTemplate(a.options.template), a.options.id);
        a.element.html(_html);
        a.element.find('#dealwalladd_' + a.options.id).click(function (e) {
            a._showAddItem(e);
        });
        a.element.find('.filter_' + a.options.id).click(function (e) {
            a._filter(e);
        });
        $(document).on('click', function (e) {
            if ($(e.target)[0].id != ('dealwalladdinnerspan_' + a.options.id))
                a.element.find('#dealwalladdspan_' + a.options.id).removeClass('addDealwall-active');
        });
        a.element.find('.dealwalladditem_' + a.options.id).click(function (e) {
            a._showadditemtemplate(e);
        });
        a.element.find('.addnewitemcancel_' + a.options.id).click(function (e) {
            a._hideadditemtemplate(e);
        });
        a.element.find('#addnewnotes_' + a.options.id).click(function (e) {
            a._addnewnotes(e);
        });
        a.element.find('#addnewattachment_' + a.options.id).click(function (e) {
            a._addnewnotes(e);
        });
        a.element.find('#notesaddattachment_' + a.options.id).click(function (e) {
            a.element.find('#noteaddattachmentdiv_' + a.options.id).show();
            a.newattachmentobj = new a.dealwallparent();
            g.bind(a.element.find('#noteaddattachmentdiv_' + a.options.id), a.newattachmentobj);
        });
        a.addNoteValidator = a.element.find('#addnewnotediv_' + a.options.id).kendoValidator({
            errorTemplate: a.errorTemplate,
            validate: a._validate,
        }).data('kendoValidator');
        a.addAttachmentValidator = a.element.find('#addnewattachmentdiv_' + a.options.id).kendoValidator({
            errorTemplate: a.errorTemplate,
            validate: a._validate,
        }).data('kendoValidator');
        a.errordiv = a.element.find('#dealwallwidgeterror_' + a.options.id);
        a.options.deletenotes = function (e) {
            a._deletenotes(e);
        }
        a.options.deletefile = function (e) {
            a._deletefile(e);
        }
        a.options.downloadattachmentfile = function (e) {
            a._downloadattachmentfile(e);
        }
        a.options.editnotes = function (e) {
            a._editnotes(e);
        }
        a.options.canceleditnotes = function (e) {
            a._canceleditnotes(e);
        }
        a.options.updatenotes = function (e) {
            a._updatenotes(e);
        }
        a.options.editattachment = function (e) {
            a._editattachment(e);
        }
        if (a.options.getactivitiesurl != "") {
            a._getactivities(a);
        }
        else {
            a._getdealWallItems(a);
        }
        g.bind(a.element, a.options);
    },
    _showAddItem: function (e) {
        $(e.currentTarget).parent().addClass('addDealwall-active');
    },
    _fileselect: function (e) {
        var a = this, file = $(e.currentTarget).get(0).files[0], namearr = file.name.split('.');
        var filetypes = ["application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel", "text/plain", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/pdf", "image/png", "image/jpeg", "image/jpg"];
        if (!(filetypes.indexOf(file.type) === -1)) {
            namearr = file.name.split('.');
            a.filedata = file;
            a.newattachmentobj.set('FileType', namearr[namearr.length - 1]);
            namearr.splice(namearr.length - 1, 1);
            a.newattachmentobj.set('FileName', namearr.join('.'));
            a.newattachmentobj.set('FileNameExt', file.name);
        }
        else {
            a.newattachmentobj.set('FileNameExt', "");
            Utility.Notification.show({
                message: 'Only files with format pdf, .doc, .docx, .xls, .xlsx, jpg, jpeg, png is allowed'
            }, '_error');
        }
    },
    _filter: function (e) {
        var curel = e.currentTarget.parentElement, a = this, value = $(e.currentTarget).data('value'), itemspresent = 0;
        curel.parentElement.getElementsByClassName('dwfactive')[0].classList.remove('dwfactive');
        curel.classList.add('dwfactive');
        a.element.find('#filterheader_' + a.options.id).text($(e.currentTarget).text());
        for (var i = 0; i < a.options.dealwallitems.length; i++) {
            if (value == 'all' || a.options.dealwallitems[i].type == value) {
                a.options.dealwallitems[i].visible = true;
                itemspresent = 1;
            }
            else {
                a.options.dealwallitems[i].visible = false;
            }
        }
        itemspresent ? $('#noitemsinfo_' + a.options.id).hide() : $('#noitemsinfo_' + a.options.id).show();
        g.bind(a.element.find('#liveFeed_' + a.options.id), a.options);
    },
    _showadditemtemplate: function (e) {
        var a = this, val = $(e.currentTarget).data('value'), b = $('#addnew' + val + 'div_' + a.options.id);
        $(e.currentTarget).parent().parent().removeClass('addDealwall-active');
        a._clearmsgs(a.addNoteValidator);
        a._clearmsgs(a.addAttachmentValidator);
        $('.TargetDivAdd').hide();
        b.show();
        a.options.newitem = new a.dealwallparent();
        if (val == 'note') {
            g.bind(b, a.options.newitem);
        }
        else if (val == 'attachment') {
            a.newattachmentobj = new a.dealwallparent();
            g.bind(b, a.newattachmentobj);
        }
    },
    _hideadditemtemplate: function (e) {
        var a = this;
        if (e && e.currentTarget) {
            $('#addnew' + $(e.currentTarget).data('value') + 'div_' + a.options.id).hide();
        }
        else {
            $('#addnew' + e + 'div_' + a.options.id).hide();
        }
        $('#noteaddattachmentdiv_' + a.options.id).hide();
    },
    //_getuserslist: function () {
    //    var a = this,
    //    url = a.options.getusersurl,
    //    type = "post",
    //    data = g.stringify({
    //    }),
    //    success = function (e) {
    //        a.users = e;
    //        if (a.options.getactivitiesurl != "") {
    //            a._getactivities(a);
    //        }
    //        else {
    //            a._getdealWallItems(a);
    //        }
    //    },
    //    error = function (msg) {
    //        a.errordiv.html("Error: " + msg.statusText);
    //        console.log("Error: " + msg.statusText);
    //    };
    //    $.callwebapi(type, url, data, error, success);
    //},
    _getactivities: function (a) {
        var a = this,
            url = a.repalceparameters(a.options.getactivitiesurl, ''),
            type = "get",
            data = null,
            success = function (e) {
                a.options.dealwallitems = e;
                a.options.dealwallitems.map(function (data) {
                    a._gettimepassed(data);
                    data.visible = true;
                });
                a._getdealWallItems(a);
            },
            error = function (msg) {
                //a.errordiv.html("Error: " + msg.statusText);
                a._getdealWallItems(a);
            };
        a.options.dealwallitems = [];
        $.callwebapi(type, url, data, error, success, a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON());
    },
    _gettimepassed: function (data) {
        var now = new Date(), objtime = new Date(data.CreatedDate);
        var appends = function (val) {
            return val != 1 ? 's' : '';
        }
        var seconds = Math.floor((now.getTime() - objtime.getTime()) / 1000);
        if (seconds < 0) {
            data.timeelapsed = "0 seconds";
        }
        else if (seconds < 60) {
            data.timeelapsed = Math.floor(seconds) + ' second' + appends(Math.floor(seconds));
        }
        else {
            var minutes = Math.floor(seconds / 60);
            if (minutes < 60) {
                data.timeelapsed = Math.floor(minutes) + ' minute' + appends(Math.floor(minutes));
            }
            else {
                var hours = Math.floor(minutes / 60);
                if (hours < 24) {
                    data.timeelapsed = Math.floor(hours) + ' hour' + appends(Math.floor(hours));
                }
                else {
                    var days = Math.floor(hours / 24);
                    if (days < 7) {
                        data.timeelapsed = Math.floor(days) + ' day' + appends(Math.floor(days));
                    }
                    else if (days < 30) {
                        data.timeelapsed = Math.floor(days / 7) + ' week' + appends(Math.floor(days));
                    }
                    else {
                        var months = Math.floor(days / 30);
                        if (months < 12) {
                            data.timeelapsed = Math.floor(months) + ' month' + appends(Math.floor(months));
                        }
                        else {
                            var years = Math.floor(months / 12);
                            data.timeelapsed = Math.floor(years) + ' year' + appends(Math.floor(years));
                        }
                    }
                }
            }
        }

    },
    _getdealWallItems: function (a) {
        var url = a.repalceparameters(a.options.getitemsurl, ''),
            type = "get", data = null,
            success = function (e) {
                if (e && e != null) {
                    if (e.Notes != null && e.Notes.length > 0) {
                        e.Notes.map(function (data) {
                            data.visible = true;
                            data.Context = JSON.parse(data.Context);
                            if (data.Description == '##attachment##' && data.Attachments && data.Attachments.length > 0) {
                                data.type = 'attachment';
                                a.options.dealwallitems.push(data);
                            }
                            else {
                                data.type = 'note';
                                if (a.options.isunderwriter) {
                                    a.options.dealwallitems.push(data);
                                }
                                else {
                                    if (!data.Context.isunderwriter) {
                                        a.options.dealwallitems.push(data);
                                    }
                                }
                            }
                        });
                    }
                    if (e.Attachments != null && e.Attachments.length > 0) {
                        data.Context = JSON.parse(data.Context);
                        a.options.dealwallitems.concat(e.Notes);
                    }
                }
                a._render();
            },
            error = function (msg) {
                a._render();
                a._widgeterror(msg);
                //console.log("Error: " + msg.statusText);
            };
        $.callwebapi(type, url, data, error, success, a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON());

    },
    _getDateandTimeFormat: function (noteDate) {
        var widgetDate = new Date(noteDate);
        var dd = widgetDate.getDate();
        var mm = widgetDate.getMonth() + 1;
        var yyyy = widgetDate.getFullYear();
        var hr = widgetDate.getHours();
        var min = widgetDate.getMinutes();
        var ampm = (hr >= 12) ? 'PM' : 'AM';
        dd = (dd < 10) ? '0' + dd : dd;
        mm = (mm < 10) ? '0' + mm : mm;
        hr = (hr > 12) ? hr - 12 : hr;
        hr = (hr < 10) ? '0' + hr : hr;
        min = (min < 10) ? '0' + min : min;
        return mm + '-' + dd + '-' + yyyy + ' | ' + hr + ':' + min + '  ' + ampm;
    },
    _sortDatabyDate: function (b, a) {
        return new Date(a.CreatedDate).getTime() - new Date(b.CreatedDate).getTime();
    },
    _render: function () {
        var a = this;
        a.element.find('#liveFeed_' + a.options.id).html(a.element.find('#dealwallitemsroottemplate_' + a.options.id).html());
        if (a.options.dealwallitems.length == 0) {
            $('#noitemsinfo_' + a.options.id).show();
        }
        else {
            a.options.dealwallitems.forEach(function (data) {
                data.displayDate = a._getDateandTimeFormat(new Date(data.CreatedDate));
            })
            a.options.dealwallitems = a.options.dealwallitems.sort(a._sortDatabyDate);
            $('#noitemsinfo_' + a.options.id).hide();
        }
        g.bind(a.element.find('#liveFeed_' + a.options.id), a.options);
        a.element.find('.editdelete_' + a.options.id).each(function () {
            var k = $(this), id = k.data('id');
            if (id != a.options.userid) {
                k.hide();
            }
        });
        a.element.find('.fileuploadinput_' + a.options.id).unbind('change').bind('change', function (e) {
            a._fileselect(e);
        });
        a.element.find('.fileuploadinput_' + a.options.id).unbind('click').bind('click', function (e) {
            this.value = null;
        });

        a.element.find('.notesaddattachmentonedit_' + a.options.id).click(function (e) {
            var uid = $(this).data('uid'),
                b = $('#noteaddattachmentdiv_' + uid);
            a.newattachmentobj = new a.dealwallparent();
            b.show();
            g.bind(b, a.newattachmentobj);
        });

    },
    _addnewnotes: function (e) {
        var a = this, itemtype = $(e.currentTarget).data('value');
        var valid = false;
        if (itemtype == 'attachment') { valid = a.addAttachmentValidator.validate() }
        else { valid = a.addNoteValidator.validate() }
        if (valid) {
            a.options.newitem.TenantId = a.options.tenantid;
            a.options.newitem.ApplicationId = a.options.applicationid;
            a.options.newitem.UserId = a.options.userid;
            a.options.newitem.EntityType = a.options.entitytype;
            a.options.newitem.EntityId = a.options.entityid;
            if (itemtype == 'attachment') {
                a.options.newitem.Subject = '##attachment##';
                a.options.newitem.Description = '##attachment##';
            }
            var ctx = new a.dalwallcontext({
                Subject: a.options.newitem.Subject,
                 Status: a.options.newitem.Status,
                  Priority: a.options.newitem.Priority,
                  NotesType: a.options.newitem.NotesType,
                  UserName: a.options.username,
                   isunderwriter: a.options.isunderwriter
            });
            a.options.newitem.Context = JSON.stringify(ctx);
            var url = a.repalceparameters(a.options.createnoteurl, ''),
                type = "post",
                data = g.stringify(a.options.newitem),
                success = function (e) {
                    a.options.newitem.Id = e.Id;
                    a.options.newitem.Context = JSON.parse(a.options.newitem.Context);
                    if (a.newattachmentobj != null) {
                        if (itemtype == 'note') {
                            a.newattachmentobj.isnote = true;
                        } else {
                            a.newattachmentobj.isnote = false;
                        }
                        a.newattachmentobj.DiaryItemId = e.Id;
                        a._addnewattachment(itemtype);
                    }
                    else {
                        a.options.newitem.Attachments = new Array();
                        a.options.newitem.type = 'note';
                        a.options.newitem.CreatedDate = new Date();
                        a.options.dealwallitems.push(a.options.newitem.toJSON());
                        a.options.newitem = new a.dealwallparent();
                        a._render();
                    }
                    if (itemtype == 'note') {
                        Utility.Notification.show({
                            message: 'Note added successfully'
                        }, '_success');
                    }
                    a._hideadditemtemplate('note');
                },
                error = function (msg) {
                    if (itemtype == 'note') {
                        Utility.Notification.show({
                            message: 'Error while adding note'
                        }, '_error');
                    }
                };
            $.callwebapi(type, url, data, error, success, a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON());
        }

    },
    _updatenotes: function (e) {
        var a = this;
        if (a.editValdator.validate()) {
            e.data.Context = JSON.stringify(e.data.Context);
            var url = a.repalceparameters(a.options.updatenoteurl, ''),
                type = "put",
                data = g.stringify(e.data),
                success = function () {
                    //a._render();
                    var uid = e.data.uid;
                    $('#noteseditdiv_' + uid).hide();
                    $('#notesviewdiv_' + uid).show();
                    Utility.Notification.show({
                        message: 'Note updated successfully'
                    }, '_success');
                },
                error = function (msg) {
                    Utility.Notification.show({
                        message: 'Error while updating note'
                    }, '_error');

                };
            $.callwebapi(type, url, data, error, success, a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON());
        }
    },
    _findandReplaceobject: function (dwitems, dwobject) {
        var elementPos = dwitems.map(function (x) { return x.Id; }).indexOf(dwobject.Id);
        if (elementPos != -1) {
            dwitems[elementPos] = dwobject;
        }
        else {
            dwobject.CreatedDate = new Date();
            dwitems.push(dwobject);
        }
        return dwitems;
    },
    _addnewattachment: function (type) {
        var a = this;
        if (a.addAttachmentValidator.validate()) {
            a.newattachmentobj.TenantId = a.options.tenantid;
            a.newattachmentobj.ApplicationId = a.options.applicationid;
            a.newattachmentobj.UserId = a.options.userid;
            a.newattachmentobj.EntityType = a.options.entitytype;
            a.newattachmentobj.EntityId = a.options.entityid;
            // a.newattachmentobj.DiaryItemType = (type == 'note') ? 'Note' : 'Attachment';
            a.newattachmentobj.DiaryItemType = 'Note';
            var ctx = new a.dalwallcontext({
                NotesType: a.newattachmentobj.NotesType, UserName: a.options.username
            });
            a.newattachmentobj.Context = JSON.stringify(ctx);
            var url = a.repalceparameters(a.options.addattachmenturl, ''),
                type = "post",
                data = g.stringify(a.newattachmentobj),
                success = function (e) {
                    // a.newattachmentobj.Id = e.Id;
                    // a.newattachmentobj.Context = JSON.parse(a.newattachmentobj.Context);
                    // var data = new FormData();
                    // var uploadsucess = function (e) {
                    //     a.newattachmentobj.Url = e[0].Path;
                    //     if (a.newattachmentobj.isnote) {
                    //         a.options.newitem.Attachments = new Array();
                    //         a.options.newitem.Attachments.push(a.newattachmentobj);
                    //         a.options.newitem.type = 'note';
                    //     }
                    //     else {
                    //         a.options.newitem.Attachments = new Array();
                    //         a.options.newitem.Attachments.push(a.newattachmentobj);
                    //         a.options.newitem.type = 'attachment';
                    //         a._hideadditemtemplate('attachment');
                    //         Utility.Notification.show({
                    //             message: 'Attachment added successfully'
                    //         }, '_success');
                    //     }
                    //     a.options.dealwallitems = a._findandReplaceobject(a.options.dealwallitems, a.options.newitem.toJSON());
                    //     a.newattachmentobj = null;
                    //     a.options.newitem = null;
                    //     a._render();
                    // };
                    // data.append('file', a.filedata);
                    // a._uploadfile(data, uploadsucess, e.Id);

                },
                error = function (msg) {
                    //a._widgeterror(msg);
                    //console.log("Error: " + msg.statusText);
                    if (a.newattachmentobj.isnote) {
                        Utility.Notification.show({
                            message: 'Error while adding attachment'
                        }, '_error');
                    }
                    a.newattachmentobj = null;
                    a.options.newitem = null;
                };
            $.callwebapi(type, url, data, error, success, a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON());
        }
    },
    _uploadfile: function (data, success, id) {
        var a = this;
        $.ajax({
            url: a.repalceparameters(a.options.uploadattachmenturl, id),
            type: 'post',
            headers: a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON(),
            data: data,
            contentType: false,
            processData: false,
            crossDomain: true,
            success: success,
            error: function (e) {
                //a._widgeterror(msg);
                a.newattachmentobj = null;
                a.options.newitem = null;
                Utility.Notification.show({
                    message: 'Error while uploading attachment'
                }, '_error');

            }
        });
    },    
    _downloadattachmentfile: function (e) {
        var a = this, url = a.repalceparameters(a.options.downloadattachmenturl, e.data.Id),
            type = 'get', data = null,
            success = function (response) {
                if (response != null) {
                    window.open(response);
                }
            },
            error = function (e) {
                a._widgeterror(e);
            };
        $.callwebapi(type, url, data, error, success, a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON());
    },
    _deletefile: function (e) {
        var a = this, isnote = $(e.currentTarget).data('isnote');
        var url = a.repalceparameters(a.options.deleteattachment, e.data.Id),
            type = 'delete', data = null,
            success = function (response) {
                for (var i = 0; i < a.options.dealwallitems.length; i++) {
                    if (isnote) {
                        if (a.options.dealwallitems[i].Attachments && a.options.dealwallitems[i].Attachments != null && a.options.dealwallitems[i].Attachments.length > 0 && a.options.dealwallitems[i].Attachments[0].Id == e.data.Id) {
                            a.options.dealwallitems[i].Attachments = new Array();
                        }
                    }
                    else {
                        if (a.options.dealwallitems[i].Id == e.data.Id) {
                            a.options.dealwallitems.splice(i, 1);
                            a._render();
                            break;
                        }
                    }
                }


            },
            error = function (e) {
                a._widgeterror(e);
            };
        $.callwebapi(type, url, data, error, success, a.options.reqheaders.uid == undefined ? a.options.reqheaders : a.options.reqheaders.toJSON());
    },
    _editnotes: function (e) {
        var a = this;
        var type = $(e.currentTarget).data('value');
        if (type == 'note') {
            a.edititemcopy = e.data.toJSON();
            var obj = JSON.parse(e.data.Context);
            // e.data.Context = obj;
            e.data.set('Context', JSON.parse(e.data.Context));
        }
        a.editValdator = a.element.find('#' + type + 'seditdiv_' + e.data.uid).kendoValidator({
            errorTemplate: a.errorTemplate,
            validate: a._validate,
        }).data('kendoValidator');
        $('#' + type + 'seditdiv_' + e.data.uid).show();
        $('#' + type + 'sviewdiv_' + e.data.uid).hide();
    },
    _canceleditnotes: function (e) {
        var a = this, uid = e.data.uid;
        e.data = a.edititemcopy;
        e.data.uid = uid;
        a._clearmsgs(a.editValdator);
        $('#noteseditdiv_' + uid).hide();
        $('#notesviewdiv_' + uid).show();
        a._render();
    },
    _widgeterror: function (e) {
        this.errordiv.html("<div class='alert alert-danger' role='alert'><div  class='vam-form-error'>Error: " + e.statusText + "</div></div>");
    }    
});
h.plugin(dealwall);