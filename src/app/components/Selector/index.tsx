import * as React from 'react';
import {computed, observable, action} from 'mobx';
import { inject, observer } from 'mobx-react';

import { StyleRulesCallback, withStyles } from 'material-ui/styles';
import List, {ListItem, ListItemText} from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import Dropzone from 'react-dropzone';

import {Component} from "../../common/";
import { STORE_BLUMMARY, STORE_ANALYSIS } from '../../constants/stores';
import { Blummary, BlummaryDTO } from '../../models/Blummary';
import { AnalysisStore, BlummaryStore } from '../../stores/index';

import SelectorRow from './Row';
import SelectorDnDOverlay from './DnDOverlay';

export type SelectorClasses = 'root';
const styles: StyleRulesCallback<SelectorClasses> = (theme) => ({
  root: {
    padding: '0.5em',
  },
})

export interface SelectorProps {
}

@inject(STORE_ANALYSIS, STORE_BLUMMARY)
@observer
class Selector extends Component<SelectorProps, SelectorClasses> {
  blummaryStore = this.props[STORE_BLUMMARY] as BlummaryStore;
  analysisStore = this.props[STORE_ANALYSIS] as AnalysisStore;

  dropzoneRef;
  @observable dropzoneActive = false;

  @action open = () => this.dropzoneRef.open();
  @action onDragEnter = (event) => this.dropzoneActive = true;
  @action onDragLeave = (event) => this.dropzoneActive = false;
  @action onDrop = async (accepted: File[], rejected: File[], event) => {
    console.log(accepted)
    this.dropzoneActive = false;
    accepted.forEach(async (file) => {
      const reader = new FileReader();
      const promise = new Promise((resolve: (res:string)=>void, reject ) => {
        reader.onload = (e: ProgressEvent) => {
            const r: any = e.target;  // TODO fix typings
            resolve(r.result);
        };
        reader.onabort = (e) => reject(e);
        reader.onerror = (e) => reject(e);
      });

      // reader.readAsBinaryString(file);
      reader.readAsText(file, 'utf8');
      this.blummaryStore.add(new Blummary(await Blummary.parseBlueprintXml(await promise)));
    });
  }

  render() {
    return (
      <Paper className={this.props.classes.root}>

        <Dropzone
          disableClick
          ref={(node) => this.dropzoneRef = node }
          style={{position: "relative"}}
          // accept={accept}
          onDrop={this.onDrop}
          onDragEnter={this.onDragEnter}
          onDragLeave={this.onDragLeave}
        >
          <SelectorDnDOverlay open={computed(()=>this.dropzoneActive)} />
          <Typography type='headline'>Select a blueprint</Typography>
          <Grid container spacing={16} alignItems='stretch'>
            <Grid item xs={12} sm={6} md={6} style={{height: '100%'}}>
              <Typography type='subheading'>Available blueprints</Typography>
              <List dense>
                { this.blummaryStore.map<JSX.Element>( (blummary) => <SelectorRow key={blummary.raw.title} blummary={blummary} /> ) }
              </List>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Button raised style={{width: '100%'}} onClick={this.open}>
                    Browse files
                  </Button>
                  <Typography align='center' type='body2'>(or drag & drop them here)</Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <Typography type='subheading'>Link to blueprint in internet</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography type='subheading'>Create new empty blueprint</Typography>
                </Grid> */}
                <Grid item xs={12}>
                  { this.props.children }
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Dropzone>
      </Paper>
    );
  }

}
export default withStyles(styles)<SelectorProps>(Selector);
