import pandas as pd
import json
import os

def clean_num(val):
    try:
        if pd.isna(val): return 0
        if isinstance(val, (int, float)): return int(val)
        val = str(val).lower().replace('k', '000').replace('m', '000000').replace(',', '').replace('+', '').strip()
        if '.' in val:
            res = int(float(val))
        else:
            res = int(val)
        # Minimum compensation floor for the platform
        if 0 < res < 500: return 500
        return res
    except:
        return 0

def format_reach(f):
    if f >= 1000000: return f'{round(f/1000000, 1)}M'
    if f >= 1000: return f'{round(f/1000, 1)}K'
    return str(f)

def parse():
    file_path = 'influencers-nepal/Influencers Survey .xlsx'
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    df = pd.read_excel(file_path)
    
    # Identify columns
    name_col = next((c for c in df.columns if 'full name' in c.lower()), None)
    
    # Followers
    insta_fol_col = next((c for c in df.columns if 'Instagram Followers' in c or 'followers do you have on Instagram' in c.lower()), None)
    tiktok_fol_col = next((c for c in df.columns if 'TikTok Followers' in c or 'followers do you have on TikTok' in c.lower()), None)
    yt_fol_col = next((c for c in df.columns if 'YouTube subscribers' in c or 'YouTube subscribers' in c.lower()), None)
    fb_fol_col = next((c for c in df.columns if 'Facebook Page?' in c or 'followers do you have on your Facebook Page' in c.lower()), None)
    
    # Social Links
    insta_url_col = next((c for c in df.columns if 'Instagram channel URL' in c or ('Instagram handle' in c.lower() and 'profile' in c.lower())), None)
    tiktok_url_col = next((c for c in df.columns if 'Tiktok channel URL' in c or ('TikTok handle' in c.lower() and 'profile' in c.lower())), None)
    yt_url_col = next((c for c in df.columns if 'YouTube channel URL' in c.lower()), None)
    fb_url_col = next((c for c in df.columns if 'Facebook Page name' in c.lower() or 'Facebook Page?' in c.lower()), None)
    
    location_col = next((c for c in df.columns if 'reside in' in c.lower()), None)
    platform_col = next((c for c in df.columns if 'primary social media platform' in c.lower()), None)
    age_col = next((c for c in df.columns if 'age group' in c.lower()), None)
    comp_col = next((c for c in df.columns if 'compensated' in c.lower()), None)

    influencers = []
    seen_names = set()

    for i, row in df.iterrows():
        raw_name = str(row.get(name_col))
        if pd.isna(row.get(name_col)) or raw_name.strip().lower() in ['fsdadfsa', 'fas', 'nan', 'test']:
            continue
        
        name = raw_name.strip()
        if name in seen_names:
            continue
        seen_names.add(name)

        # Reach calculation
        insta_fol = clean_num(row.get(insta_fol_col, 0))
        tiktok_fol = clean_num(row.get(tiktok_fol_col, 0))
        yt_fol = clean_num(row.get(yt_fol_col, 0))
        fb_fol = clean_num(row.get(fb_fol_col, 0))
        f_count = insta_fol + tiktok_fol + yt_fol + fb_fol
        
        platform = str(row.get(platform_col, 'Instagram'))
        if platform == 'nan' or platform == 'None': 
            if tiktok_fol > insta_fol and tiktok_fol > yt_fol: platform = 'TikTok'
            elif yt_fol > insta_fol: platform = 'YouTube'
            else: platform = 'Instagram'

        location = str(row.get(location_col, 'Nepal'))
        if location == 'nan': location = 'Nepal'

        age = str(row.get(age_col, 'All Ages'))
        if age == 'nan': age = 'All Ages'

        comp = str(row.get(comp_col, 'Contact for details'))
        if comp == 'nan': comp = 'Contact for details'

        # Social links
        insta_url = str(row.get(insta_url_col, ''))
        tiktok_url = str(row.get(tiktok_url_col, ''))
        yt_url = str(row.get(yt_url_col, ''))
        fb_url = str(row.get(fb_url_col, ''))

        # Improved Platform Detection
        available_platforms = []
        if insta_url != 'nan' and len(insta_url) > 2: available_platforms.append('Instagram')
        if tiktok_url != 'nan' and len(tiktok_url) > 2: available_platforms.append('TikTok')
        if yt_url != 'nan' and len(yt_url) > 2: available_platforms.append('YouTube')
        if fb_url != 'nan' and len(fb_url) > 2: available_platforms.append('Facebook')
        
        # Primary platform logic
        platform = str(row.get(platform_col, 'Instagram'))
        if platform == 'nan' or platform == 'None' or platform == 'Creator': 
            if len(available_platforms) > 0:
                platform = available_platforms[0]
            else:
                platform = 'Instagram' # Default

        location = str(row.get(location_col, 'Nepal'))
        if location == 'nan': location = 'Nepal'

        age = str(row.get(age_col, 'All Ages'))
        if age == 'nan': age = 'All Ages'

        comp_str = str(row.get(comp_col, 'Contact for details'))
        if comp_str == 'nan': comp_str = 'Contact for details'
        
        # Extract individual compensation types for filtering
        comp_tags = [c.strip() for c in comp_str.replace(' or ', ',').split(',') if len(c.strip()) > 2]
        if not comp_tags: comp_tags = ['Contact for details']

        influencers.append({
            'id': 1000 + i,
            'name': name,
            'handle': f"@{name.lower().replace(' ', '_')}",
            'niche': "Digital Creator",
            'followers': format_reach(f_count),
            'followers_raw': f_count,
            'platform': platform,
            'platforms': available_platforms if available_platforms else [platform],
            'location': location,
            'age_group': age,
            'compensation': comp_str,
            'comp_tags': comp_tags,
            'image': f"https://api.dicebear.com/7.x/avataaars/svg?seed={name.replace(' ', '')}",
            'bio': f"Creative talent based in {location}. Open for meaningful collaborations.",
            'socials': {
                'instagram': insta_url if insta_url != 'nan' else '',
                'tiktok': tiktok_url if tiktok_url != 'nan' else '',
                'youtube': yt_url if yt_url != 'nan' else '',
                'facebook': fb_url if fb_url != 'nan' else ''
            }
        })

    # Sort by name
    influencers = sorted(influencers, key=lambda x: x['name'])
    
    os.makedirs('public/data', exist_ok=True)
    with open('public/data/influencers.json', 'w') as f:
        json.dump(influencers, f, indent=2)
    
    print(f"Successfully processed {len(influencers)} influencers.")

if __name__ == "__main__":
    parse()
