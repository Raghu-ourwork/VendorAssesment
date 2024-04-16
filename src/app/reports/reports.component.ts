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
      token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSIsImtpZCI6InEtMjNmYWxldlpoaEQzaG05Q1Fia1A1TVF5VSJ9.eyJhdWQiOiIwMDAwMDAwMi0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NTUwY2NhOC0xMDU1LTQyNTgtYWQzYi1lZTNjY2EwZWY0NjIvIiwiaWF0IjoxNzEzMTg4NzI1LCJuYmYiOjE3MTMxODg3MjUsImV4cCI6MTcxMzE5MjYyNSwiYWlvIjoiRTJOZ1lLajdtM0p6MStORWpWbU15VUp4ZHZkREFRPT0iLCJhcHBpZCI6IjAyOGY3ZDhlLTYwN2UtNDQyMC04ZDEyLWRiNWU2OWI2YTliNCIsImFwcGlkYWNyIjoiMSIsImlkcCI6Imh0dHBzOi8vc3RzLndpbmRvd3MubmV0Lzg1NTBjY2E4LTEwNTUtNDI1OC1hZDNiLWVlM2NjYTBlZjQ2Mi8iLCJvaWQiOiIwODc5MzhlNy1lNDIwLTQ5YTYtYmE3YS0xMTM3MzMwYTFhMmMiLCJyaCI6IjAuQVhVQXFNeFFoVlVRV0VLdE8tNDh5ZzcwWWdJQUFBQUFBQUFBd0FBQUFBQUFBQUIxQUFBLiIsInN1YiI6IjA4NzkzOGU3LWU0MjAtNDlhNi1iYTdhLTExMzczMzBhMWEyYyIsInRlbmFudF9yZWdpb25fc2NvcGUiOiJOQSIsInRpZCI6Ijg1NTBjY2E4LTEwNTUtNDI1OC1hZDNiLWVlM2NjYTBlZjQ2MiIsInV0aSI6IjRGejl4aTkzOGtlSDVZLTY2V2tIQUEiLCJ2ZXIiOiIxLjAifQ.VNmpnNcquMJbcCuKevGJcWiEIsbnYvauiL8KggkMUEv6kwYnby4Zz7pLp_ax1QxEBOc_U_IpdbovOgrgjhh7FsTMCeAC_KKksuC30HLrnbGtiNIDEeOKTz28VChSnMFBg_uAbwbT_1z9Od8grxZ-QCYhRN6YTnf14MWMJXGHv6rd1F59imdjWXlBBX95M32Z3V5b8v0k82mbFoUuOBKh81ClwDcav-zqQ6-oqtz_lKjCamd-trqy9KX6cRlMOe3nVYCX6CjqMS82cJ6XW8r52ugQxaVipxlSN33oYq0PkDDRi5iOrtJirgdRh0trEP84fPtC0bTJW0FaopPzgrkNYw',
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
