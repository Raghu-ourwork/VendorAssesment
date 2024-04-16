import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as pbi from 'powerbi-client';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/api.service';
import { Report } from 'report';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent implements OnInit, AfterViewInit {
  public subPages: any = {};
  public sidebarItems: any = {};
  public currentSubMenu: String;
  public isReportLoading = false;
  public result: any;

  public report: Report;
  public reportId: string;
  @ViewChild('reportContainer') reportContainer: ElementRef;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) { }
  async ngOnInit() {

  }
  async ngAfterViewInit() {
    this.showReport();
  }

  showReport() {
    let reportContainer = this.reportContainer.nativeElement;
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    powerbi.reset(reportContainer);

    let embedData = {
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODU1MGNjYTgtMTA1NS00MjU4LWFkM2ItZWUzY2NhMGVmNDYyLyIsImlhdCI6MTcxMzI2NjI3OCwibmJmIjoxNzEzMjY2Mjc4LCJleHAiOjE3MTMyNzAxNzgsImFpbyI6IkUyTmdZRkF0V2VRNHRZVDVTNU85cU05QldSMEhBQT09IiwiYXBwaWQiOiIyNjNjODVjYy00ZjBhLTQzYWUtOWE2NS1hOGI1ZWMxZWExOWYiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NTUwY2NhOC0xMDU1LTQyNTgtYWQzYi1lZTNjY2EwZWY0NjIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI1ZGJkMDMyYi02NTVmLTQzMDYtOWUwMS1lOWE1YjVmY2RiM2UiLCJyaCI6IjAuQVhVQXFNeFFoVlVRV0VLdE8tNDh5ZzcwWWdrQUFBQUFBQUFBd0FBQUFBQUFBQUIxQUFBLiIsInN1YiI6IjVkYmQwMzJiLTY1NWYtNDMwNi05ZTAxLWU5YTViNWZjZGIzZSIsInRpZCI6Ijg1NTBjY2E4LTEwNTUtNDI1OC1hZDNiLWVlM2NjYTBlZjQ2MiIsInV0aSI6IkxUZUk5bHhPR1UyNEZYUENkM1oxQUEiLCJ2ZXIiOiIxLjAifQ.8P3w0fAoEajWfFWsPk6-tccebSUTlz_t-d5h2d_BxwDnlT1hvLhGMv2C_2oZBJYm6bprQJjVL3uGAAyD4RHr28ec3vgU7FSGkSCYHnD1zVrZFWLEVb8ZNxOAWcyQAWbOnnl2BjvGjsDZbwAfVEs_Naxlih-0pBWj8EZ5W4ZjesC6ieZiOHYumVUiVJFb1hRaIqlRIzN0eRN3lshDEXzy9bFIdmx9UfSppF0bNLM3zZ2PJy0LkvOspagrUukmEkSdbPUnrHaBL0UFhrWVxlPVZQ8B6aAUPEk9vu2Oq9hJYNxywC6KExaznuAfQ3lENWpM06dRW1MjXx3R7CE1sXXvsA',
      embedUrl: 'https://app.powerbi.com/reportEmbed',
      reportId: '9c35b38b-b414-42ac-9e24-cbab01a9b1e2',
    }

    var models = pbi.models;
    let config = {
      type: 'report',
      tokenType: models.TokenType.Aad,
      accessToken: embedData.token,
      embedUrl: embedData.embedUrl,
      // pageName: reportSectionId,
      id: embedData.reportId,
      settings: {
        filterPaneEnabled: false,
        navContentPaneEnabled: false,
      }
    } as pbi.IEmbedConfiguration;


    var self = this;
    self.report = <Report>(powerbi.embed(reportContainer, config));

    self.report.on("loaded", () => {

    });
    self.report.on("rendered", () => {
      this.isReportLoading = false;
      //enable left side menu action

      document.getElementById('sidebar').style.pointerEvents = 'auto';
      document.getElementsByTagName('iframe')[0].style.border = '0';
    });

    self.report.on("error", (e) => {
      document.getElementById('sidebar').style.pointerEvents = 'auto';
    });
  }
}
